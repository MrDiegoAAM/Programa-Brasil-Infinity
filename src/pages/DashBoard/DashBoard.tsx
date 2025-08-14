import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Header from "../../components/Header/Header";
import { Container } from "./style";
import Footer from "../../components/Footer/Footer";
import AnimatedPage from "../../components/AnimatedPage";
import ResetPage from "../../components/AboutTeam/ResetPage";
import { toast } from "react-toastify";
import CardUsuario from "../../components/CardUsuario/CardUsuario";
import { IRegisterPerson as IRegisterInstitution } from "../../components/ModalRegister/ModalRegister";
import { useData } from "../../contexts/authContext/DataContext";
import PrintButton from "../../components/PrintButton";
import { usePrintToPDF } from "../../hooks/usePrintToPDF";

interface IDataUserprops {
  adress: string;
  cpf: number | string;
  email: string;
  id: number;
  name: string;
  phone: number;
}

export interface IRegisterPerson {
  id?: number;
  name: string;
  age: number;
  description?: string;
  institution: string;
  date?: string;
  created_at?: string;
  abrigado?: string;
  picture: string;
  contact?: string;
  userId?: number;
  user?: IDataUserprops;
}

export default function DashBoard() {
  const { userProfile, createHomeless } = useData();
  const { printToPDF } = usePrintToPDF();
  
  // Determinar tipo de usuário baseado no perfil
  const isInstitution = userProfile && 'cnpj' in userProfile;
  const isAbrigado = userProfile && 'cpf' in userProfile;

  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    age: yup.number().required("Campo obrigatório").positive("Idade deve ser um número positivo"),
    description: yup.string().max(70),
    institution: yup.string().required("Campo obrigatório"),
    created_at: yup.string(),
    abrigado: yup.string(),
    picture: yup.string().required("Campo obrigatório"),
    contact: yup.string().email(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegisterPerson>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IRegisterPerson) => {
    try {
      if (!userProfile || !isInstitution) {
        toast.error("Erro: Usuário não é uma instituição válida.");
        return;
      }

      await createHomeless({
        name: data.name,
        age: data.age,
        cpf: data.cpf,
        telephone: data.telephone,
        address: data.address,
        picture: data.picture,
        description: data.description || '',
        institution_id: userProfile.id,
        registered_by: userProfile.id,
        has_login: false
      });

      toast.success("Abrigado cadastrado com sucesso!");
      reset();
    } catch (error) {
      console.error("Erro ao cadastrar abrigado:", error);
      toast.error("Erro ao cadastrar abrigado. Tente novamente.");
    }
  };

  return (
    <>
      <Header />
      <AnimatedPage>
        <Container>
          <section className="text">
            <CardUsuario />
          </section>
          
          <PrintButton 
            onPrint={() => printToPDF({ 
              title: 'Formulário de Cadastro de Abrigado',
              filename: 'cadastro-abrigado.pdf',
              excludeSelectors: ['.print-button', 'header', 'footer', 'button[type="submit"]']
            })}
          />
          
          {/* Formulário de cadastro apenas para instituições */}
          {isInstitution && (
            <div className="form-container">
              <div className="form-header">
                <h1>Cadastrar novo abrigado</h1>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-container">
                  <label htmlFor="">Nome</label>
                  <input
                    type="text"
                    placeholder="Nome completo"
                    {...register("name")}
                  />
                  <p className="error-message">{errors.name?.message}</p>
                </div>
                <div className="input-container">
                  <label htmlFor="">Idade</label>
                  <input
                    type="number"
                    placeholder="Idade"
                    {...register("age")}
                  />
                  <p className="error-message">{errors.age?.message}</p>
                </div>
                <div className="input-container">
                  <label htmlFor="">Descrição</label>
                  <input
                    type="text"
                    placeholder="Descrição (opcional)"
                    {...register("description")}
                  />
                  <p className="error-message">{errors.description?.message}</p>
                </div>
                <div className="input-container">
                  <label htmlFor="">Instituição</label>
                  <input
                    type="text"
                    placeholder="Nome da instituição"
                    {...register("institution")}
                  />
                  <p className="error-message">{errors.institution?.message}</p>
                </div>
                <div className="input-container">
                  <label htmlFor="">Data de cadastro</label>
                  <input
                    type="date"
                    {...register("created_at")}
                  />
                  <p className="error-message">{errors.created_at?.message}</p>
                </div>
                <div className="input-container">
                  <label htmlFor="">Abrigado</label>
                  <input
                    type="text"
                    placeholder="Status do abrigado"
                    {...register("abrigado")}
                  />
                  <p className="error-message">{errors.abrigado?.message}</p>
                </div>
                <div className="input-container">
                  <label htmlFor="">Imagem</label>
                  <input
                    type="text"
                    placeholder="Link para a imagem"
                    {...register("picture")}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="">Contato da instituição</label>
                  <input
                    placeholder="Telefone da instituição"
                    {...register("contact")}
                  />
                  <p className="error-message">{errors.contact?.message}</p>
                </div>

                <button>Cadastrar</button>
              </form>
            </div>
          )}

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
                  Área Restrita
                </h2>
                <p style={{ fontSize: '18px', color: '#666', lineHeight: '1.6' }}>
                  Como abrigado, você pode visualizar e editar apenas seus dados pessoais.
                </p>
                <p style={{ fontSize: '16px', color: '#666', marginTop: '15px' }}>
                  O cadastro de novos abrigados é permitido apenas para instituições.
                </p>
                <p style={{ fontSize: '16px', color: '#666', marginTop: '15px' }}>
                  Para editar seus dados como abrigado, clique em "Perfil" no menu acima.
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
