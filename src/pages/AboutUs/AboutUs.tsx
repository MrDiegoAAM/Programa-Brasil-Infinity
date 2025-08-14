import AboutTeam from "../../components/AboutTeam";
import AnimatedPage from "../../components/AnimatedPage";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ResetPage from "../../components/AboutTeam/ResetPage";
import AnimatedTitle from "../../components/AnimatedTitle";
import { DivBackground, Main } from "./styles";

export default function AboutUs() {
  return (
    <>
      <Header />
      <AnimatedPage>
        <DivBackground>
          <Main>
            <div className="content-container">
              {/* Header Hero */}
              <div className="hero-header">
                <AnimatedTitle className="hero-title">Programa Brasil Infinity School</AnimatedTitle>
                <p className="hero-subtitle">
                  Iniciativa do Governo Federal para enfrentar a situação de pessoas em vulnerabilidade social. 
                  Identificamos, cadastramos e oferecemos oportunidades, conectando pessoas a abrigos, empresas, ONGs e instituições de apoio.
                </p>
                <div className="hero-badges">
                  <span className="badge">Governo Federal</span>
                  <span className="badge">Infinity School</span>
                  <span className="badge">Impacto Social</span>
                </div>
                <a href="#team" className="cta-button">
                  Conheça nossa equipe
                </a>
              </div>

              {/* Grid de Seções */}
              <div className="sections-grid">
                <div className="section-card">
                  <div className="section-icon">🎯</div>
                  <h2 className="section-title">Quem Somos</h2>
                  <div className="section-content">
                    O <strong>Programa Brasil Infinity School</strong> é uma iniciativa do Governo Federal, 
                    com apoio da Infinity School, criada para enfrentar um dos maiores desafios sociais do país: 
                    a situação das pessoas em vulnerabilidade social.
                  </div>
                </div>

                <div className="section-card">
                  <div className="section-icon">⚙️</div>
                  <h2 className="section-title">O que Fazemos</h2>
                  <div className="section-content">
                    Sistema de cadastro rápido e seguro de pessoas carentes, reunindo dados pessoais, 
                    socioeconômicos e histórico de vida. Conexão com doações, empregos, moradia, 
                    assistência social e apoio psicológico.
                  </div>
                </div>

                <div className="section-card">
                  <div className="section-icon">🔒</div>
                  <h2 className="section-title">Como Atuamos</h2>
                  <div className="section-content">
                    Armazenamento seguro dos dados, geração de PDF do cadastro, uso para localizar 
                    pessoas desaparecidas e reconectar familiares. Seguimos as melhores práticas 
                    de proteção de dados.
                  </div>
                </div>

                <div className="section-card">
                  <div className="section-icon">🌐</div>
                  <h2 className="section-title">Nossa Missão</h2>
                  <div className="section-content">
                    Garantir que cada história registrada possa ser um passo para transformar vidas, 
                    unindo tecnologia e impacto social para criar pontes entre quem precisa e quem pode ajudar.
                  </div>
                </div>
              </div>

              {/* Seção de Funcionalidades */}
              <div className="features-section">
                <h2 className="features-title">Funcionalidades-chave</h2>
                <div className="features-grid">
                  <div className="feature-item">
                    <div className="feature-icon">📋</div>
                    <span className="feature-text">Cadastro de pessoas carentes</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">🏠</div>
                    <span className="feature-text">Cadastro de abrigados e organizações</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">📄</div>
                    <span className="feature-text">Relatórios em PDF</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">🔍</div>
                    <span className="feature-text">Busca de desaparecidos</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">📊</div>
                    <span className="feature-text">Informações sobre vulnerabilidade social</span>
                  </div>
                </div>
              </div>



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
