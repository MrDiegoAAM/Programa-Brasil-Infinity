/* eslint-disable jsx-a11y/iframe-has-title */
import { Main, CardMap, Description, DivMaps } from "./styles";
import imgCampanha from "../../img/campanha.png";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AnimatedPage from "../../components/AnimatedPage";
import ResetPage from "../../components/AboutTeam/ResetPage";

interface ILocalDoacao {
  nome: string;
  queryMaps: string;   // consulta para o Google Maps
  fone: string | null; // string p/ manter zeros e separadores
}

export default function CampanhaGOV() {
  // Locais de Recife – PE
  const locais: ILocalDoacao[] = [
    {
      nome: "Cruz Vermelha Brasileira – Filial Pernambuco (Boa Vista)",
      queryMaps: "Cruz Vermelha Brasileira Pernambuco, Av. João de Barros, Boa Vista, Recife - PE",
      fone: "(81) 3231-4200",
    },
    {
      nome: "Centro POP Recife – Santo Amaro",
      queryMaps: "Centro POP Recife, Santo Amaro, Recife - PE",
      fone: null,
    },
    {
      nome: "Restaurante Popular Naíde Teodósio – Santo Amaro",
      queryMaps: "Restaurante Popular Naíde Teodósio, Santo Amaro, Recife - PE",
      fone: null,
    },
    {
      nome: "COMPaz Ariano Suassuna – Cordeiro",
      queryMaps: "Compaz Ariano Suassuna, Av. Gen. San Martin, Cordeiro, Recife - PE",
      fone: null,
    },
    {
      nome: "COMPaz Eduardo Campos – Alto Santa Terezinha",
      queryMaps: "Compaz Eduardo Campos, Alto Santa Terezinha, Recife - PE",
      fone: null,
    },
    {
      nome: "Secretaria de Desenvolvimento Social, Direitos Humanos, Juventude e Políticas sobre Drogas (SEDSDHJPD) – Recife",
      queryMaps: "Secretaria de Desenvolvimento Social Recife SEDSDHJPD, Recife - PE",
      fone: null,
    },
  ];

  const toEmbed = (q: string) =>
    `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;

  return (
    <>
      <Header />
      <AnimatedPage>
        <Main>
          <Description>
            <h2>O que é?</h2>
            <p>
              O <strong>Programa Brasil Infinity School</strong> é uma iniciativa do Governo Federal,
              com apoio da Infinity School, para cadastrar e apoiar pessoas em situação de
              vulnerabilidade social em Recife. Além do cadastro seguro, conectamos quem precisa
              a doações, serviços públicos, oportunidades de trabalho e suporte psicossocial.
            </p>
            <p>
              Esta campanha de arrecadação prioriza roupas (inclusive agasalhos) e cobertores em
              bom estado. A entrega pode ser feita nos pontos abaixo; os itens são triados e
              direcionados às equipes de assistência social e organizações parceiras.
            </p>
          </Description>

          <figure>
            <img src={imgCampanha} alt="Campanha de Apoio do Programa Brasil Infinity School" />
          </figure>

          <DivMaps>
            <h2>Pontos de Apoio em Recife</h2>
            <ul>
              {locais.map((elem) => (
                <li key={elem.nome}>
                  <span>
                    {elem.nome}
                    {elem.fone ? ` — ${elem.fone}` : ""}
                  </span>
                  <CardMap>
                    <iframe src={toEmbed(elem.queryMaps)} loading="lazy"></iframe>
                  </CardMap>
                </li>
              ))}
            </ul>
          </DivMaps>
        </Main>
        <Footer color={"#0057FF"} />
        <ResetPage />
      </AnimatedPage>
    </>
  );
}