import { Navigate, useLocation } from 'react-router-dom';
import { TreePine } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          color: '#4a7c43',
          background: 'linear-gradient(135deg, #f6fbf3 0%, #fff 100%)',
        }}
      >
        <TreePine size={40} style={{ opacity: 0.6, animation: 'adminPulse 1.4s ease-in-out infinite' }} />
        <p style={{ color: '#5f705d', fontWeight: 600 }}>Verifying admin access…</p>
        <style>{`@keyframes adminPulse { 0%,100%{opacity:.6} 50%{opacity:1} }`}</style>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
