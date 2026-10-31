import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Verified Founder Admin Emails
const ADMIN_EMAILS = [
  'digitalgulzarservices@gmail.com',
  'contact@papergenius.in'
];

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#7C3CFF] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 text-sm">Checking secure session...</p>
        </div>
      </div>
    );
  }

  // Not logged in -> Send to /auth with return path
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  const userEmail = (user.email || '').toLowerCase().trim();
  const isFounderAdmin = ADMIN_EMAILS.includes(userEmail) || role === 'admin';

  // Protecting Admin Route
  if (allowedRoles && allowedRoles.includes('admin')) {
    if (!isFounderAdmin) {
      // Unauthorized user trying to access admin -> bounce to respective dashboard
      return <Navigate to={role === 'teacher' ? '/teacher/dashboard' : '/student'} replace />;
    }
    return children;
  }

  // Protecting Teacher vs Student Routes
  if (allowedRoles && !allowedRoles.includes(role)) {
    // If admin is browsing teacher or student dashboards, allow access
    if (isFounderAdmin) return children;

    if (role === 'teacher') {
      return <Navigate to="/teacher/dashboard" replace />;
    }
    return <Navigate to="/student" replace />;
  }

  return children;
}
