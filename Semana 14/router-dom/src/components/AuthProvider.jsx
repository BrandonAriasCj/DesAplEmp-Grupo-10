import { useAuthStore } from '../stores/authStore';
import { Navigate } from 'react-router-dom';

function AuthProvider({ children }) {
  const { token } = useAuthStore();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default AuthProvider;