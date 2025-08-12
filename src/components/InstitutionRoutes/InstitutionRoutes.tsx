import { Outlet, Navigate } from "react-router-dom";

export default function InstitutionRoutes() {
  const token = localStorage.getItem("@TOKEN");
  const userType = localStorage.getItem("@type");
  
  // Se não tem token, redireciona para login
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  // Se é abrigado, redireciona para dashboard
  if (userType === "abrigado") {
    return <Navigate to="/dashboard" />;
  }
  
  // Se é instituição, permite acesso
  return <Outlet />;
}