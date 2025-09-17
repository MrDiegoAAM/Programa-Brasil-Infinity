import { NavLink, useNavigate } from "react-router-dom";
import {
  BodyCart,
  BodyImageHomeless,
  BtnSupport,
  CartCoat,
  CartInstitution,
  CartProjects,
  CartSearch,
  ContainerHome,
  LegendImageHomeless,
  Message,
} from "./styles";

import imgHomeless from "../../img/homeless.png";
import Header from "../../components/Header/Header";
import imgArrow from "../../img/Arrow6.png";
import AnimatedPage from "../../components/AnimatedPage";
import Footer from "../../components/Footer/Footer";
import ResetPage from "../../components/AboutTeam/ResetPage";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext/AuthContext";

export default function Home() {
  const { isLogin, isAbrigado } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <ContainerHome id="top">
      <Header />
      <AnimatedPage>
        <main>
          <BodyImageHomeless>
            <img
              src={imgHomeless}
              alt="Pessoa em situação de rua com pertences em via pública de Recife"
            />
            <LegendImageHomeless>
              <Message>
                <h1>Quando a rua se torna a única opção...</h1>
                <p>
                  Em Recife, muitas pessoas enfrentam a dura realidade de viver
                  nas ruas. A falta de oportunidades, o rompimento de vínculos
                  familiares e a ausência de políticas habitacionais efetivas
                  tornam essas pessoas invisíveis aos olhos da sociedade. O{" "}
                  <strong>Programa Brasil Infinity School</strong> surge para
                  mudar essa história, conectando quem precisa de ajuda a quem
                  pode oferecer apoio — seja em forma de doações, oportunidades
                  ou acolhimento.
                </p>
                <BtnSupport
                  onClick={() =>
                    isLogin ? navigate("/usuario") : navigate("/login")
                  }
                >
                  Apoiar
                </BtnSupport>
              </Message>
            </LegendImageHomeless>
          </BodyImageHomeless>

          <BodyCart>
            <CartCoat onClick={() => navigate("/programadoacolhimentogov")}>
              <NavLink to="/programadoacolhimentogov" replace>
                <div>
                  <h2>Campanha de Arrecadação</h2>
                  <p>
                    Doe roupas, agasalhos e cobertores nos pontos oficiais de
                    Recife
                  </p>
                  <img src={imgArrow} alt="Seta para a direita" />
                </div>
              </NavLink>
            </CartCoat>

            <CartInstitution
              onClick={() =>
                isLogin ? navigate("/usuario") : navigate("/login")
              }
            >
              <NavLink to="/login">
                <div>
                  <h2>Você é uma instituição parceira?</h2>
                  <p>
                    Cadastre-se e tenha acesso para apoiar pessoas
                    cadastradas
                  </p>
                  <img src={imgArrow} alt="Seta para a direita" />
                </div>
              </NavLink>
            </CartInstitution>

            <CartProjects onClick={() => navigate("/sobrenos")}>
              <NavLink to="/sobrenos">
                <div>
                  <h2>Sobre o Programa</h2>
                  <p>Saiba mais sobre o Brasil Infinity School</p>
                  <img src={imgArrow} alt="Seta para a direita" />
                </div>
              </NavLink>
            </CartProjects>

            {!isAbrigado && (
              <CartSearch onClick={() => navigate("/pesquisapessoas")}>
                <NavLink to="/pesquisapessoas">
                  <div>
                    <h2>Busca de Pessoas</h2>
                    <p>
                      Procure e ajude a reconectar pessoas com suas famílias
                    </p>
                    <img src={imgArrow} alt="Seta para a direita" />
                  </div>
                </NavLink>
              </CartSearch>
            )}
          </BodyCart>
        </main>
        <Footer color={"rgb(226, 45, 0)"} />
        <ResetPage />
      </AnimatedPage>
    </ContainerHome>
  );
}
