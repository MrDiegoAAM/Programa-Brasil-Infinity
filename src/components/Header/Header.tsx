import HeaderDiv, {
  DivList,
  DivLogo,
  DivMenu,
  DivNav,
  DivNavigate,
  InstitutionInfo,
  InstitutionAvatar,
  InstitutionName,
} from "./styles";
import Logo from "../../img/Logo.png";
import { AiOutlineMenu } from "react-icons/ai";
import { useContext } from "react";
import Menu from "../Menu/Index";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { Link } from "react-router-dom";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import ResetPage from "../AboutTeam/ResetPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Header() {
  const { isLogin, isModal, setIsModal, logout, user, isInstitution } = useContext(AuthContext);
  return (
    <HeaderDiv>
      <DivLogo>
        <Link to="/home">
          <img src={Logo} alt="Logotipo Da Instituição" />
        </Link>
      </DivLogo>
      {isModal && <Menu />}
      <DivList>
        <DivNavigate>
          <Link to="/home">Programa Brasil Infinity</Link>
          <Link to="/sobrenos">Participe</Link>
          <Link to="/programadoacolhimentogov">Parceiros</Link>
          {isInstitution && (
            <Link to="/pesquisapessoas">Participantes</Link>
          )}
          {isInstitution && (
            <Link to="/meusabrigados">Meus Abrigados</Link>
          )}
        </DivNavigate>
        <DivNav>
          {isLogin ? (
            <>
              {user && (
                <InstitutionInfo>
                  <InstitutionAvatar>
                    {user.picture ? (
                      <img src={user.picture} alt={user.name} />
                    ) : (
                      <div className="placeholder">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </InstitutionAvatar>
                  <InstitutionName>{user.name}</InstitutionName>
                </InstitutionInfo>
              )}
              <Link to="/profile">
                <CgProfile />
                Perfil
              </Link>
              <Link to="/home" onClick={logout}>
                <BiLogOut />
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <BiLogIn />
                Login
              </Link>
            </>
          )}
        </DivNav>
      </DivList>
      <DivMenu>
        <button onClick={() => setIsModal(true)}>
          <AiOutlineMenu />
        </button>
      </DivMenu>
      <ToastContainer />
      <ResetPage />
    </HeaderDiv>
  );
}
