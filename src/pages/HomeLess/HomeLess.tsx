import { useContext, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { GrNext, GrPrevious } from "react-icons/gr";
import { AuthContext } from "../../contexts/authContext/AuthContext";

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

import imgSearch from "../../img/search.png";
import imgComeBack from "../../img/ComeBack.png";
import imgProceed from "../../img/Proceed.png";
import imgTeste from "../../img/people01.jpg";
import api from "../../server/api";
import Footer from "../../components/Footer/Footer";
import ResetPage from "../../components/AboutTeam/ResetPage";
import AnimatedPage from "../../components/AnimatedPage";
import { Link } from "react-router-dom";

export default function HomeLess() {
  const {
    homeLess,
    isNextDisabled,
    isGoBackDisabled,
    search,
    setSearchFor,
    next,
    goBack,
    setHomeLess,
    token,
    isAbrigado,
    isInstitution,
    user,
  } = useContext(AuthContext);

  console.log("=== COMPONENTE ABRIGADOS CARREGADO ===");
  console.log("Token atual:", token);
  console.log("Abrigados data:", homeLess);
  useEffect(() => {
    api.get("/homeless").then((res) => {
      console.log(res);
      setHomeLess([...res.data]);
    });
  }, []);



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
            {isInstitution && user && (
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
                  {user.picture ? (
                    <img 
                      src={user.picture} 
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
                      {user.name?.charAt(0).toUpperCase()}
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
                    {user.name}
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
            <BodyMissing>
              {homeLess.length === 0 ? (
                <div>
                  <p>Ops...</p>
                  <p>Nenhum resultado encontrado!</p>
                </div>
              ) : (
                homeLess.map((user) => (
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
              <button disabled={isGoBackDisabled} onClick={() => goBack()}>
                {/* <img src={imgComeBack} alt="Voltar lista de usuarios" /> */}
                <GrPrevious />
              </button>

              <button disabled={isNextDisabled} onClick={() => next()}>
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
