import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CardUsuario from "../../components/CardUsuario/CardUsuario";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import AnimatedPage from "../../components/AnimatedPage";
import ResetPage from "../../components/ResetPage/ResetPage";
import { Container } from "./Profile.styles";
import { useData } from "../../contexts/authContext/DataContext";

export default function Profile() {
  const { userProfile } = useData();
  
  // Determinar tipo de usuário baseado no userProfile
  const isInstitution = userProfile && 'cnpj' in userProfile;
  const isAbrigado = userProfile && 'cpf' in userProfile;

  return (
    <>
      <Header />
      <AnimatedPage>
        <Container>
          <div className="profile-container">
            <div className="profile-header">
              <div className="welcome-badge">
                <span>👋</span>
                Bem-vindo(a) ao seu espaço
              </div>
              <h1>Suas Informações Pessoais</h1>
              <p>Este é o seu espaço seguro para visualizar e atualizar seus dados. Todas as informações são tratadas com total confidencialidade e respeito.</p>
            </div>
            
            <div className="profile-form-wrapper">
              {isAbrigado ? <ProfileForm /> : <CardUsuario />}
            </div>
          </div>
        </Container>
        <Footer color={"#354A59"} />
        <ResetPage />
      </AnimatedPage>
    </>
  );
}