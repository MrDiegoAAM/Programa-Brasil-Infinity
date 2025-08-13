import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import AboutUs from "../pages/AboutUs/AboutUs";
import CampanhaGOV from "../pages/CampanhaGOV/CampanhaGOV";
import DashBoard from "../pages/DashBoard/DashBoard";
import Home from "../pages/Home/Home";
import HomeLess from "../pages/HomeLess/HomeLess";
import SupabaseLogin from "../pages/Login/SupabaseLogin";
import Profile from "../pages/Profile/Profile";
import MeusAbrigados from "../pages/MeusAbrigados/MeusAbrigados";
import { AnimatePresence } from "framer-motion";
import PrivateRoutes from "../components/PrivateRoutes/PrivateRoutes";
import InstitutionRoutes from "../components/InstitutionRoutes/InstitutionRoutes";

export default function RouteMain() {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route path="/home" element={<Home />} />
        <Route path="/sobrenos" element={<AboutUs />} />
        <Route path="/programadoacolhimentogov" element={<CampanhaGOV />} />
        <Route path="/login" element={<SupabaseLogin />} />
        <Route element={<InstitutionRoutes/>}>
          <Route path="/pesquisapessoas" element={<HomeLess />} />
          <Route path="/meusabrigados" element={<MeusAbrigados />} />
        </Route>
        <Route element={<PrivateRoutes/>}>
          <Route path="/usuario" element={<DashBoard />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
    </AnimatePresence>
  );
}
