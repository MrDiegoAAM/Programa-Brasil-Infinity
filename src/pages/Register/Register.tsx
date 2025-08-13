import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext/SupabaseAuthContext";
import { useData } from "../../contexts/authContext/DataContext";
import { supabase } from "../../services/supabase";
import { toast, ToastContainer } from "react-toastify";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AnimatedPage from "../../components/AnimatedPage";
import { Container } from "./Register.styles";
import { IRegisterPerson } from "../../components/ModalRegister/ModalRegister";

export default function Register() {
  const { signUp } = useAuth();
  const { institutions, loadInstitutions } = useData();
  const navigate = useNavigate();
  const [isInstitution, setIsInstitution] = useState(false);
  const [isAbrigado, setIsAbrigado] = useState(false);
  const [loading, setLoading] = useState(false);
  const customId = "custom-id-yes";

  // Carregar instituições quando o componente é montado
  useEffect(() => {
    loadInstitutions();
  }, [loadInstitutions]);

  const formSchema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    cnpj: yup.string().when('$isInstitution', {
      is: true,
      then: (schema) => schema.required("CNPJ é obrigatório"),
      otherwise: (schema) => schema.notRequired()
    }),
    cpf: yup.string().when('$isAbrigado', {
      is: true,
      then: (schema) => schema.required("CPF é obrigatório"),
      otherwise: (schema) => schema.notRequired()
    }),
    age: yup.string().when('$isAbrigado', {
      is: true,
      then: (schema) => schema.required("Idade é obrigatória"),
      otherwise: (schema) => schema.notRequired()
    }),
    address: yup.string(),
    phone: yup.string(),
    telephone: yup.string(),
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    password: yup.string().min(6, "Senha deve ter pelo menos 6 caracteres").required("Senha é obrigatória"),
    picture: yup.string(),
    description: yup.string(),
    institutionId: yup.string().when('$isAbrigado', {
      is: true,
      then: (schema) => schema.required("Instituição é obrigatória"),
      otherwise: (schema) => schema.notRequired()
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IRegisterPerson>({
    resolver: yupResolver(formSchema),
    context: { isAbrigado, isInstitution }
  });

  const onSubmitFunction = async (data: IRegisterPerson) => {
    setLoading(true);
    try {
      // Primeiro, criar o usuário no Supabase Auth
      await signUp(data.email, data.password);

      if (isInstitution) {
        // Inserir dados da instituição na tabela institutions
        const { error: dbError } = await supabase
          .from('institutions')
          .insert({
            name: data.name,
            cnpj: data.cnpj,
            address: data.address,
            telephone: data.phone,
            email: data.email,
            password: data.password,
            picture: data.picture || '',
          });

        if (dbError) {
          console.error("Erro no cadastro de instituição:", dbError);
          toast.error(`Erro: ${dbError.message}`);
          return;
        }
      } else if (isAbrigado) {
        // Inserir dados do abrigado na tabela homeless
        const { error: dbError } = await supabase
          .from('homeless')
          .insert({
            name: data.name,
            age: parseInt(data.age),
            cpf: data.cpf,
            email: data.email,
            telephone: data.phone,
            password: data.password,
            picture: data.picture || '',
            description: data.description || '',
            institution_id: data.institutionId,
          });

        if (dbError) {
          console.error("Erro no cadastro de abrigado:", dbError);
          toast.error(`Erro: ${dbError.message}`);
          return;
        }
      }

      toast.success("Registro realizado com sucesso!", {
        autoClose: 1500,
        toastId: customId,
      });
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      toast.error(`Erro: ${error.message || 'Erro desconhecido'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUserTypeChange = (type: 'institution' | 'abrigado') => {
    if (type === 'institution') {
      setIsInstitution(true);
      setIsAbrigado(false);
    } else {
      setIsInstitution(false);
      setIsAbrigado(true);
    }
    reset(); // Limpa o formulário quando muda o tipo
  };

  return (
    <>
      <Header />
      <AnimatedPage>
        <Container>
          <div className="register-container">
            <div className="register-header">
              <h1>Cadastre-se</h1>
              <p>Escolha o tipo de cadastro e preencha os dados</p>
            </div>

            <div className="user-type-selector">
              <button
                type="button"
                className={`type-button ${isInstitution ? 'active' : ''}`}
                onClick={() => handleUserTypeChange('institution')}
              >
                Instituição
              </button>
              <button
                type="button"
                className={`type-button ${isAbrigado ? 'active' : ''}`}
                onClick={() => handleUserTypeChange('abrigado')}
              >
                Abrigado
              </button>
            </div>

            {(isInstitution || isAbrigado) && (
              <form onSubmit={handleSubmit(onSubmitFunction)} className="register-form">
                <div className="form-grid">
                  <div className="input-group">
                    <label htmlFor="name">
                      {isInstitution ? 'Nome da Instituição' : 'Nome Completo'}
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder={isInstitution ? 'Digite o nome da instituição' : 'Digite seu nome completo'}
                      {...register("name")}
                    />
                    {errors.name && <span className="error">{errors.name.message}</span>}
                  </div>

                  {isInstitution && (
                    <div className="input-group">
                      <label htmlFor="cnpj">CNPJ</label>
                      <input
                        type="text"
                        id="cnpj"
                        placeholder="00.000.000/0000-00"
                        {...register("cnpj")}
                      />
                      {errors.cnpj && <span className="error">{errors.cnpj.message}</span>}
                    </div>
                  )}

                  {isAbrigado && (
                    <>
                      <div className="input-group">
                        <label htmlFor="cpf">CPF</label>
                        <input
                          type="text"
                          id="cpf"
                          placeholder="000.000.000-00"
                          {...register("cpf")}
                        />
                        {errors.cpf && <span className="error">{errors.cpf.message}</span>}
                      </div>

                      <div className="input-group">
                        <label htmlFor="age">Idade</label>
                        <input
                          type="number"
                          id="age"
                          placeholder="Digite sua idade"
                          {...register("age")}
                        />
                        {errors.age && <span className="error">{errors.age.message}</span>}
                      </div>
                    </>
                  )}

                  <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Digite seu email"
                      {...register("email")}
                    />
                    {errors.email && <span className="error">{errors.email.message}</span>}
                  </div>

                  <div className="input-group">
                    <label htmlFor="password">Senha</label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Digite sua senha"
                      {...register("password")}
                    />
                    {errors.password && <span className="error">{errors.password.message}</span>}
                  </div>

                  <div className="input-group">
                    <label htmlFor="phone">Telefone</label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="(00) 00000-0000"
                      {...register("phone")}
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="address">Endereço</label>
                    <input
                      type="text"
                      id="address"
                      placeholder="Digite o endereço"
                      {...register("address")}
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="picture">Foto (URL)</label>
                    <input
                      type="url"
                      id="picture"
                      placeholder="Link da foto"
                      {...register("picture")}
                    />
                  </div>

                  {isAbrigado && (
                    <>
                      <div className="input-group full-width">
                        <label htmlFor="description">Descrição</label>
                        <textarea
                          id="description"
                          placeholder="Digite uma breve descrição"
                          rows={3}
                          {...register("description")}
                        />
                      </div>

                      <div className="input-group full-width">
                        <label htmlFor="institutionId">Instituição</label>
                        <select {...register("institutionId")}>
                          <option value="">Selecione uma instituição</option>
                          {institutions.map((institution) => (
                            <option key={institution.id} value={institution.id}>
                              {institution.name}
                            </option>
                          ))}
                        </select>
                        {errors.institutionId && (
                          <span className="error">{errors.institutionId.message}</span>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                  </button>
                  
                  <div className="login-link">
                    <p>
                      Já tem uma conta?{' '}
                      <span onClick={() => navigate('/login')}>Fazer login</span>
                    </p>
                  </div>
                </div>
              </form>
            )}


          </div>
        </Container>
      </AnimatedPage>
      <Footer color="#354A59" />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}