import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { GrNext, GrPrevious } from "react-icons/gr";
import { useAuth } from "../../contexts/authContext/SupabaseAuthContext";
import { useData } from "../../contexts/authContext/DataContext";
import PrintButton from "../../components/PrintButton";
import { usePrintToPDF } from "../../hooks/usePrintToPDF";

import { ContainerHome } from "../Home/styles";
import {
  BodyHomeLess,
  BodyMissing,
  CardHomeLess,
  DirectionsBottom,
  DirectionsTop,
  HeaderSearchHomeLess,
  Main,
  Search,
} from "./styles";
import Header from "../../components/Header/Header";

import imgTeste from "../../img/people01.jpg";
import Footer from "../../components/Footer/Footer";
import ResetPage from "../../components/AboutTeam/ResetPage";
import AnimatedPage from "../../components/AnimatedPage";
import { Link } from "react-router-dom";

export default function HomeLess() {
  const { user } = useAuth();
  const { homeless, userProfile, loading } = useData();
  const [searchFor, setSearchFor] = useState("");
  const [filteredHomeless, setFilteredHomeless] = useState(homeless);
  const { printToPDF } = usePrintToPDF();
  
  // Determinar tipo de usuário baseado no userProfile
  const isInstitution = userProfile && 'cnpj' in userProfile;
  const isAbrigado = userProfile && 'cpf' in userProfile;
  
  console.log("=== COMPONENTE ABRIGADOS CARREGADO ===");
  console.log("User:", user);
  console.log("UserProfile:", userProfile);
  console.log("Homeless data:", homeless);

  // Atualizar lista filtrada quando os dados mudarem
  useEffect(() => {
    setFilteredHomeless(homeless);
  }, [homeless]);
  
  // Função de busca
  const search = () => {
    if (!searchFor.trim()) {
      setFilteredHomeless(homeless);
      return;
    }
    
    const filtered = homeless.filter((person: any) => 
      person.name?.toLowerCase().includes(searchFor.toLowerCase()) ||
      person.cpf?.includes(searchFor) ||
      person.rg?.includes(searchFor)
    );
    setFilteredHomeless(filtered);
  };
  
  // Funções de paginação (simplificadas por enquanto)
  const next = () => {
    // TODO: Implementar paginação
  };
  
  const goBack = () => {
    // TODO: Implementar paginação
  };



  // Se for abrigado, mostrar mensagem informativa
  if (isAbrigado) {
    return (
      <ContainerHome>
        <Header />
        <AnimatedPage>
          <Main>
            <BodyHomeLess>
              <div style={{ 
                textAlign: 'center', 
                padding: '50px 20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '10px',
                margin: '20px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h2 style={{ color: '#1B187A', marginBottom: '20px' }}>
                  Acesso Restrito
                </h2>
                <p style={{ fontSize: '18px', color: '#666', lineHeight: '1.6' }}>
                  Como abrigado, você não tem permissão para visualizar os dados das pessoas cadastradas.
                </p>
                <p style={{ fontSize: '16px', color: '#666', marginTop: '15px' }}>
                  Para visualizar seus dados pessoais, clique em "Perfil" no menu acima.
                </p>
              </div>
            </BodyHomeLess>
          </Main>
          <Footer color={"#1B187A"} />
          <ResetPage />
        </AnimatedPage>
      </ContainerHome>
    );
  }

  return (
    <ContainerHome>
      <Header />
      <AnimatedPage>
        <Main>
          <BodyHomeLess>
            {/* Cabeçalho com informações da instituição */}
            {isInstitution && userProfile && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                marginBottom: '1rem',
                border: '1px solid #e9ecef'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#007bff'
                }}>
                  {userProfile.picture ? (
                    <img 
                      src={userProfile.picture} 
                      alt="Foto da instituição"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <span style={{
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '1.2rem'
                    }}>
                      {userProfile.name?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h3 style={{
                    margin: '0',
                    color: '#374c5a',
                    fontSize: '1.2rem',
                    fontWeight: '600'
                  }}>
                    {userProfile.name}
                  </h3>
                  <p style={{
                    margin: '0',
                    color: '#6c757d',
                    fontSize: '0.9rem'
                  }}>
                    Pesquisando pessoas cadastradas
                  </p>
                </div>
              </div>
            )}
            <HeaderSearchHomeLess>
              <Search>
                <input
                  type="text"
                  placeholder="Digite sua pesquisa aqui"
                  onChange={(event) => setSearchFor(event.target.value)}
                />

                <button onClick={() => search()}>
                  <BsSearch />
                </button>
              </Search>

              <DirectionsTop>
                <button disabled onClick={() => goBack()}>
                  {/* <img src={imgComeBack} alt="Voltar lista de usuarios" /> */}
                  <GrPrevious />
                </button>

                <button disabled onClick={() => next()}>
                  {/* <img src={imgProceed} alt="Adiantar lista de usuarios" /> */}
                  <GrNext />
                </button>
              </DirectionsTop>
            </HeaderSearchHomeLess>
            
            <PrintButton 
              onPrint={() => printToPDF({ 
                title: 'Relatório de Pessoas Cadastradas',
                filename: 'pessoas-cadastradas.pdf',
                excludeSelectors: ['.print-button', 'header', 'footer', '.directions']
              })}
              disabled={loading || filteredHomeless.length === 0}
            />
            
            <BodyMissing>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <p>Carregando...</p>
                </div>
              ) : filteredHomeless.length === 0 ? (
                <div>
                  <p>Ops...</p>
                  <p>Nenhum resultado encontrado!</p>
                </div>
              ) : (
                filteredHomeless.map((user: any) => (
                  <CardHomeLess key={user.id}>
                    <Link to="#">
                      <figure>
                        <img
                          src={
                            user.picture?.includes("https")
                              ? user.picture
                              : imgTeste
                          }
                          alt="Foto do usuario"
                        />
                        <figcaption>
                          <ul>
                            <li>
                              {" "}
                              <span> Nome: </span> {user.name}
                            </li>
                            <li>
                              {" "}
                              <span> Idade: </span> {user.age}
                            </li>
                            <li>
                              {" "}
                              <span> Instituição: </span>{" "}
                              {(user as any).institution_name || (user as any).institutionName || user.institution || "Não informado"}
                            </li>
                            <li>
                              {" "}
                              <span> Descrição: </span>{" "}
                              {user.description}
                            </li>
                          </ul>
                        </figcaption>
                      </figure>
                    </Link>
                  </CardHomeLess>
                ))
              )}
            </BodyMissing>

            <DirectionsBottom>
              <button disabled onClick={() => goBack()}>
                {/* <img src={imgComeBack} alt="Voltar lista de usuarios" /> */}
                <GrPrevious />
              </button>

              <button disabled onClick={() => next()}>
                {/* <img src={imgProceed} alt="Adiantar lista de usuarios" /> */}
                <GrNext />
              </button>
            </DirectionsBottom>
          </BodyHomeLess>
        </Main>
        <Footer color={"#435664"} />
        <ResetPage />
      </AnimatedPage>
    </ContainerHome>
  );
}
