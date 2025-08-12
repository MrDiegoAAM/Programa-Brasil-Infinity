import { Content, Copyright, Main, SocialMedia } from "./styles";
import {
  BsFacebook,
  BsWhatsapp,
  BsYoutube,
  BsInstagram,
  BsLinkedin
} from "react-icons/bs";
import { FiTwitter } from "react-icons/fi";
import imgLogo from "../../img/Logo.png";
import { Link } from "react-router-dom";

interface IFooterProps{
  color?:string | undefined
}
export default function Footer({color}:IFooterProps){
  return(
    <Main>
      <SocialMedia className="media" color={`${color}`}>
        <BsFacebook className="icon blue" />
        <BsLinkedin className="icon blue-white" />
        <FiTwitter className="icon blue-clear" />
        <BsWhatsapp className="icon green " />
        <BsYoutube className="icon red" />
        <BsInstagram className="icon grad" />
      </SocialMedia>
          
      <Content color={`${color}`}>
        <div className="message">
          <p>
            "A empatia é certamente um dos mais nobres sentimentos humanos.
            Para entender e ajudar o próximo é necessário se imaginar na
            condição dele."
          </p>
          <span>Lázaro de Souza Gomes</span>
        </div>
        <div className="info">
          <div>
            <Link to="/home"><img src={imgLogo} alt="imagem do logo" /></Link>
          </div>
          <ul>
            <li>Fone: (81)99755-2530</li>
            <li>E-mail: diegoaam@hotmail.com</li>
            <li>Endereço: Riomar trade 4 - Av. República do Líbano, 256 - sala 919 - Pina, Recife - PE, 51110-160</li>
          </ul>
        </div>
      </Content >
      <Copyright color={`${color}`}>
        <span> <Link to="/sobrenos">&copy;Desenvolvido por Diego Madeira</Link></span>
      </Copyright>
    </Main>
  )
}
