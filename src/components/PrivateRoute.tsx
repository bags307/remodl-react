import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!currentUser) {
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
}