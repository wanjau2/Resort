import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreePine, LogIn, AlertCircle, ShieldCheck } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import './AdminLogin.css';

const AdminLogin = () => {
  const { signIn, isSupabaseConfigured } = useAdminAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const { error: signInError } = await signIn(email, password);
      if (signInError) {
        setError(signInError.message);
      } else {
        navigate('/admin', { replace: true });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-card">
        <div className="login-logo">
          <TreePine size={32} />
          <span>Green Valley Resort</span>
        </div>

        <div className="login-header">
          <ShieldCheck size={22} className="login-shield" />
          <h1>Admin Portal</h1>
          <p>Sign in to manage bookings, products, and sales.</p>
        </div>

        {!isSupabaseConfigured && (
          <div className="login-demo-note">
            <strong>Demo mode</strong> — Supabase is not connected yet.
            <br />
            Use <code>{`admin@greenvalleyresort.com`}</code> / <code>admin123</code>
          </div>
        )}

        {error && (
          <div className="login-error">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label>
            <span>Email address</span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@greenvalleyresort.com"
              required
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>

          <button type="submit" className="login-btn" disabled={submitting}>
            <LogIn size={18} />
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="login-back">
          <a href="/">← Back to resort</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
