import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CardUsuario from "../../components/CardUsuario/CardUsuario";
import AnimatedPage from "../../components/AnimatedPage";
import ResetPage from "../../components/ResetPage/ResetPage";
import { Container } from "../DashBoard/style";
import { useData } from "../../contexts/authContext/DataContext";

export default function Profile() {
  const { userProfile } = useData();
  
  // Determinar tipo de usuário baseado no userProfile
  const isAbrigado = userProfile && 'cpf' in userProfile;

  return (
    <>
      <Header />
      <AnimatedPage>
        <Container>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '40px',
            padding: '20px 20px 200px 20px',
            minHeight: 'calc(100vh - 70px)'
          }}>
            {/* Mensagem informativa para abrigados */}
            {isAbrigado && (
              <div style={{ 
                textAlign: 'center', 
                padding: '30px 20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                width: '350px',
                maxWidth: '100%',
                marginTop: '20px'
              }}>
                <h2 style={{ color: '#1B187A', marginBottom: '15px', fontSize: '20px' }}>
                  Perfil do Abrigado
                </h2>
                <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.5', marginBottom: '10px' }}>
                  Aqui você pode visualizar e editar seus dados pessoais.
                </p>
                <p style={{ fontSize: '14px', color: '#666' }}>
                  Para editar suas informações, clique no botão "Editar" abaixo.
                </p>
              </div>
            )}
            
            <CardUsuario />
          </div>
        </Container>
        <Footer color={"#354A59"} />
        <ResetPage />
      </AnimatedPage>
    </>
  );
}