import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";

import Header from "../../components/Header/Header";
import { Container } from "./style";
import api from "../../server/api";
import Footer from "../../components/Footer/Footer";
import AnimatedPage from "../../components/AnimatedPage";
import ResetPage from "../../components/AboutTeam/ResetPage";
import { toast } from "react-toastify";
import CardUsuario from "../../components/CardUsuario/CardUsuario";
import { IRegisterPerson as IRegisterInstitution } from "../../components/ModalRegister/ModalRegister";
import { AuthContext } from "../../contexts/authContext/AuthContext";

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
  const userId = Number(localStorage.getItem("@userId"));
  const { isAbrigado, isInstitution } = useContext(AuthContext);

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
  } = useForm<IRegisterPerson>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IRegisterPerson) => {
    // data.userId = userId;
    const type = localStorage.getItem("@type");

    if (type === "abrigado") {
      toast.error(
        `É necessário estar vinculado a uma instituição para cadastrar um abrigado`
      );
      return;
    } else {
      api
        .post("/homeless", data)
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            toast.success("Abrigado cadastrado com sucesso");
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error(`Ocorreu um erro. Tente novamente.`);
        });
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
                    placeholder="Digite o nome"
                    {...register("name")}
                  />
                  <p className="error-message">{errors.name?.message}</p>
                </div>
                <div className="input-container">
                  <label htmlFor="">Idade</label>
                  <input
                    type="number"
                    placeholder="Digite a idade"
                    {...register("age", { valueAsNumber: true })}
                  />
                  <p className="error-message">{errors.age?.message}</p>
                </div>
                <div className="input-container">
                  <label htmlFor="">Descrição física</label>
                  <textarea
                    placeholder="Descreva a aparência"
                    rows={3}
                    {...register("description")}
                  />
                  <p className="error-message">{errors.description?.message}</p>
                </div>
                <div className="input-container">
                  <label htmlFor="">Instituição de registro</label>
                  <input
                    type="text"
                    placeholder="Identifique o local de registro"
                    {...register("institution")}
                  />
                  <p className="error-message">
                    {errors.institution?.message}
                  </p>
                </div>
                <div className="input-container">
                  <label htmlFor="">Data de registro</label>
                  <input type="date" {...register("created_at")} />
                  <p className="error-message">{errors.created_at?.message}</p>
                </div>

                <div className="input-container">
                  <label htmlFor="">Abrigado</label>
                  <input
                    type="text"
                    placeholder="Nome do abrigado registrando"
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
