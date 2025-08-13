import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext/SupabaseAuthContext";
import { useData } from "../../contexts/authContext/DataContext";

export default function InstitutionRoutes() {
  const { user, loading: authLoading } = useAuth();
  const { userProfile, loading: dataLoading } = useData();
  
  if (authLoading || dataLoading) {
    return <div>Carregando...</div>;
  }
  
  // Se não tem usuário, redireciona para login
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // Se é abrigado (tem CPF), redireciona para dashboard
  if (userProfile && 'cpf' in userProfile) {
    return <Navigate to="/dashboard" />;
  }
  
  // Se é instituição (tem CNPJ), permite acesso
  return <Outlet />;
}