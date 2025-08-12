import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CardUsuario from "../../components/CardUsuario/CardUsuario";
import AnimatedPage from "../../components/AnimatedPage";
import ResetPage from "../../components/ResetPage/ResetPage";
import { Container } from "../DashBoard/style";

export default function Profile() {
  const { isAbrigado } = useContext(AuthContext);

  return (
    <>
      <Header />
      <AnimatedPage>
        <Container>
          <section className="text">
            <CardUsuario />
          </section>
          
          {/* Mensagem informativa para abrigados */}
          {isAbrigado && (
            <div className="form-container">
              <div style={{ 
                textAlign: 'center', 
                padding: '40px 20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '10px',
                margin: '20px 0',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h2 style={{ color: '#1B187A', marginBottom: '20px' }}>
                  Perfil do Abrigado
                </h2>
                <p style={{ fontSize: '18px', color: '#666', lineHeight: '1.6' }}>
                  Aqui você pode visualizar e editar seus dados pessoais.
                </p>
                <p style={{ fontSize: '16px', color: '#666', marginTop: '15px' }}>
                  Para editar suas informações, clique no botão "Editar" acima.
                </p>
              </div>
            </div>
          )}
        </Container>
        <Footer color={"#354A59"} />
        <ResetPage />
      </AnimatedPage>
    </>
  );
}