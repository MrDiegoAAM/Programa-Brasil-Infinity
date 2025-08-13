import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext/SupabaseAuthContext";

export default function PrivateRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
}
