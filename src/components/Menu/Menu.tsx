import { ContainerModal, DivLinks, DivMatriz, DivSocials } from "./styles";
import {
  AiOutlineYoutube,
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import {
  BiLogIn,
  BiSearchAlt,
  BiHome,
  BiDonateHeart,
  BiLogOut,
} from "react-icons/bi";
import { TbHeartHandshake } from "react-icons/tb";
import { Link } from "react-router-dom";
import { IoIosPeople } from "react-icons/io";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { CgProfile } from "react-icons/cg";
import ResetPage from "../AboutTeam/ResetPage";

export default function Menu() {
  const { isLogin, setIsModal, logout, user } = useContext(AuthContext);
  const handleOutSideClick = (e: any) => {
    if (e.target.id === "modalMenu") {
      setIsModal(false);
    }
  };
  return (
    <ContainerModal id="modalMenu" onClick={handleOutSideClick}>
      <DivLinks>
        <DivSocials>
          <h3>Nossas Redes Sociais</h3>
          <div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://youtube.com"
            >
              <AiOutlineYoutube />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://facebook.com"
            >
              <AiOutlineFacebook />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://instagram.com"
            >
              <AiOutlineInstagram />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://whatsapp.com"
            >
              <AiOutlineWhatsApp />
            </a>
          </div>
        </DivSocials>
        <DivMatriz>
          <h3>Matriz</h3>
          <p>R. Infinity Shcool, 1</p>
          <p>Recife-PE</p>
          <p>Tel:(81)99755-2530</p>
        </DivMatriz>

        <div>
          <Link to="/home" replace>
            <BiHome />
            Home
          </Link>
          <Link to="/sobrenos" replace>
            <IoIosPeople />
            Quem Somos
          </Link>
          <Link to="/programadoacolhimentogov" replace>
            <TbHeartHandshake />
            Projetos
          </Link>
          {!user.isAbrigado && (
            <Link to="/pesquisapessoas" replace>
              <BiSearchAlt />
              Pesquisar
            </Link>
          )}
          <Link to="/home" replace>
            <BiDonateHeart />
            Apoie Agora
          </Link>
          {isLogin ? (
            <>
              <Link to="/profile" replace>
                {" "}
                <CgProfile />
                Perfil{" "}
              </Link>
              <Link to="/home" replace onClick={logout}>
                {" "}
                <BiLogOut />
                Logout
              </Link>
            </>
          ) : (
            <Link to="/login" replace>
              <BiLogIn /> Login
            </Link>
          )}
        </div>
      </DivLinks>
      <ResetPage />
    </ContainerModal>
  );
}
