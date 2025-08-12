import AboutTeam from "../../components/AboutTeam";
import AnimatedPage from "../../components/AnimatedPage";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ResetPage from "../../components/AboutTeam/ResetPage";
import { DivBackground, Main } from "./styles";

export default function AboutUs() {
  return (
    <>
      <Header />
      <AnimatedPage>
        <DivBackground>
          <Main>
            <div>
              <h1>Quem Somos</h1>
              <p>
                O <strong>Programa Brasil Infinity School</strong> é uma
                iniciativa do Governo Federal, com apoio da Infinity School,
                criada para enfrentar um dos maiores desafios sociais do país:
                a situação das pessoas em situação de vulnerabilidade social.
                Nosso objetivo é identificar, cadastrar e oferecer oportunidades
                para quem mais precisa, conectando essas pessoas a abrigados,
                empresas, ONGs e instituições de apoio.{" "}
                <a href="#team">
                  Saiba mais sobre o desenvolvedor do sistema
                </a>
              </p>

              <h2>O que Fazemos</h2>
              <p>
                Desenvolvemos um sistema que permite o cadastro rápido e seguro
                de pessoas carentes, reunindo informações essenciais para que
                possamos direcionar ajuda de forma eficaz. Nosso aplicativo
                coleta dados pessoais, informações socioeconômicas e histórico
                de vida, de maneira simples e acessível.
              </p>
              <p>
                Com base nesses dados, buscamos criar pontes entre quem precisa
                de ajuda e quem pode oferecer — seja com doações, oportunidades
                de emprego, moradia, assistência social ou apoio psicológico.
              </p>
              <p>
                O sistema também permitirá cadastrar abrigados, empresas e
                organizações não governamentais dispostas a ajudar, facilitando
                o contato e a oferta de suporte de acordo com a localização e as
                necessidades de cada pessoa cadastrada.
              </p>
              <p id="italic">
                Nosso objetivo é garantir que cada história registrada possa ser
                um passo para transformar vidas, unindo tecnologia e impacto
                social.
              </p>

              <h2>Como Atuamos</h2>
              <p>
                As informações coletadas são armazenadas em um banco de dados
                seguro, seguindo as melhores práticas de proteção de dados e
                garantindo a privacidade dos participantes. Além disso, o
                sistema gera um PDF com todas as informações do cadastro, para
                facilitar a gestão e acompanhamento dos casos.
              </p>
              <p>
                À medida que a base de dados cresce, o programa também será
                usado para ajudar na localização de pessoas desaparecidas e na
                reconexão com familiares, superando a dificuldade de
                comunicação que muitas enfrentam.
              </p>

              <ul>
                <li>Cadastro de pessoas carentes</li>
                <li>Cadastro de abrigados e organizações</li>
                <li>Geração automática de relatórios em PDF</li>
                <li>Busca por pessoas desaparecidas</li>
                <li>Informações e dados sobre vulnerabilidade social</li>
              </ul>

              <AboutTeam />
            </div>
          </Main>
        </DivBackground>
        <Footer color={"#1B187A"} />
        <ResetPage />
      </AnimatedPage>
    </>
  );
}
