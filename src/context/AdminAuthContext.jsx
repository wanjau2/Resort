import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// ─── Demo mode ────────────────────────────────────────────────────────────────
// When Supabase is not configured the admin portal falls back to a simple
// hard-coded credential check so you can still test the UI locally.
const DEMO_ADMIN_EMAIL = 'admin@greenvalleyresort.com';
const DEMO_ADMIN_PASSWORD = 'admin123';
const DEMO_SESSION_KEY = 'resort_admin_demo_session';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // ── helpers ────────────────────────────────────────────────────────────────

  /**
   * After a successful Supabase sign-in, confirm the user is in the
   * admin_users table (row-level-security protects that table).
   */
  const verifyAdminRole = async (supabaseUser) => {
    if (!supabaseUser) return false;

    const { data, error } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', supabaseUser.id)
      .maybeSingle();

    return !error && Boolean(data);
  };

  // ── bootstrap ──────────────────────────────────────────────────────────────

  useEffect(() => {
    let ignore = false;

    const bootstrap = async () => {
      if (!isSupabaseConfigured) {
        // Demo mode: restore session from localStorage
        const raw = localStorage.getItem(DEMO_SESSION_KEY);
        if (raw) {
          try {
            const session = JSON.parse(raw);
            if (!ignore) {
              setUser(session.user);
              setIsAdmin(true);
            }
          } catch {
            localStorage.removeItem(DEMO_SESSION_KEY);
          }
        }
        if (!ignore) setLoading(false);
        return;
      }

      // Supabase mode: get current session
      const { data: { session } } = await supabase.auth.getSession();
      if (!ignore) {
        if (session?.user) {
          const adminOk = await verifyAdminRole(session.user);
          setUser(adminOk ? session.user : null);
          setIsAdmin(adminOk);
        }
        setLoading(false);
      }
    };

    bootstrap();

    if (isSupabaseConfigured) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (!ignore) {
          if (session?.user) {
            const adminOk = await verifyAdminRole(session.user);
            setUser(adminOk ? session.user : null);
            setIsAdmin(adminOk);
          } else {
            setUser(null);
            setIsAdmin(false);
          }
          setLoading(false);
        }
      });

      return () => {
        ignore = true;
        subscription.unsubscribe();
      };
    }

    return () => {
      ignore = true;
    };
  }, []);

  // ── public API ─────────────────────────────────────────────────────────────

  const signIn = async (email, password) => {
    if (!isSupabaseConfigured) {
      // Demo mode credential check
      if (
        email.trim().toLowerCase() === DEMO_ADMIN_EMAIL &&
        password === DEMO_ADMIN_PASSWORD
      ) {
        const demoUser = {
          id: 'demo-admin',
          email: DEMO_ADMIN_EMAIL,
          user_metadata: { full_name: 'Demo Admin' },
        };
        localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify({ user: demoUser }));
        setUser(demoUser);
        setIsAdmin(true);
        return { user: demoUser, error: null };
      }
      return { user: null, error: new Error('Invalid credentials.') };
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return { user: null, error };

    const adminOk = await verifyAdminRole(data.user);
    if (!adminOk) {
      await supabase.auth.signOut();
      return {
        user: null,
        error: new Error('Access denied. This account is not an admin.'),
      };
    }

    setUser(data.user);
    setIsAdmin(true);
    return { user: data.user, error: null };
  };

  const signOut = async () => {
    if (!isSupabaseConfigured) {
      localStorage.removeItem(DEMO_SESSION_KEY);
    } else {
      await supabase.auth.signOut();
    }
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AdminAuthContext.Provider value={{ user, loading, isAdmin, signIn, signOut, isSupabaseConfigured }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used inside AdminAuthProvider');
  return ctx;
};
