import { DivBack } from "./styles";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/authContext/SupabaseAuthContext";
import { useData } from "../../contexts/authContext/DataContext";
import { supabase } from "../../services/supabase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface IRegisterPerson {
  name: string;
  age: string;
  cnpj: string;
  cpf: string;
  address: string;
  phone: string;
  telephone: string;
  email: string;
  password: string;
  picture: string;
  description: string;
  institutionId: string;
}

interface IInstitution {
  id: string;
  name: string;
}

interface ModalRegisterProps {
  isRegister: boolean;
  setIsRegister: (value: boolean) => void;
}

export default function ModalRegister({ isRegister, setIsRegister }: ModalRegisterProps) {
  const { signUp } = useAuth();
  const { institutions } = useData();
  const [isInstitution, setIsInstitution] = useState(false);
  const [isAbrigado, setIsAbrigado] = useState(false);
  const customId = "custom-id-yes";

  const formSchema = yup.object().shape({
    name: yup.string(),
    cnpj: yup.string(),
    cpf: yup.string(),
    age: yup.string(),
    address: yup.string(),
    phone: yup.string(),
    telephone: yup.string(),
    email: yup.string().email().required("Email obrigatório"),
    password: yup.string().required("Senha obrigatória"),
    picture: yup.string(),
    description: yup.string(),
    institutionId: yup.string().when('$isAbrigado', {
      is: true,
      then: (schema) => schema.required("Instituição obrigatória"),
      otherwise: (schema) => schema.notRequired()
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterPerson>({
    resolver: yupResolver(formSchema),
    context: { isAbrigado }
  });

  const onSubmitFunction = async (data: IRegisterPerson) => {
    console.log(data);
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
            password: data.password, // Note: Em produção, não armazene senhas em texto plano
            picture: data.picture || '',
          });

        if (dbError) {
          console.error("Erro no cadastro de instituição:", dbError);
          toast.error(`Erro: ${dbError.message}`);
          return;
        }
      } else {
        // Inserir dados do abrigado na tabela homeless
        const { error: dbError } = await supabase
          .from('homeless')
          .insert({
            name: data.name,
            age: parseInt(data.age),
            cpf: data.cpf,
            email: data.email,
            telephone: data.phone,
            password: data.password, // Note: Em produção, não armazene senhas em texto plano
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

      toast.success("Registro realizado com sucesso", {
        autoClose: 1500,
        toastId: customId,
      });
      setTimeout(() => setIsRegister(false), 2500);
    } catch (error: any) {
       console.error("Erro no cadastro:", error);
       toast.error(`Erro: ${error.message || 'Erro desconhecido'}`);
     }
   };

  return (
    <DivBack>
      <section>
        <h3>Cadastre-se</h3>
        <div id="toggle">
          <button
            className="toggle-buttons"
            id="institution"
            onClick={() => {
              setIsAbrigado(false);
              setIsInstitution(true);
            }}
          >
            Instituição
          </button>
          <button
            className="toggle-buttons"
            id="abrigado"
            onClick={() => {
              setIsInstitution(false);
              setIsAbrigado(true);
            }}
          >
            Abrigado
          </button>
        </div>

        {isInstitution && (
          <>
            <form onSubmit={handleSubmit(onSubmitFunction)}>
              <label>Nome da instituição</label>
              <input
                type="text"
                placeholder="Digite o nome"
                {...register("name")}
              />

              <label>CNPJ</label>
              <input
                type="text"
                placeholder="Digite o CNPJ Ex: 00.000.000/0000-00"
                {...register("cnpj")}
              />
              {/* {errors.cnpj?.message} */}

              <label>Email</label>
              <input
                type="email"
                placeholder="Digite o email"
                {...register("email")}
              />

              <label>Senha</label>
              <input
                type="password"
                placeholder="Digite a senha"
                {...register("password")}
              />

              <label>Endereço</label>
              <input
                type="text"
                placeholder="Informe o seu endereço"
                {...register("address")}
              />

              <label>Telefone</label>
              <input
                type="phone"
                placeholder="Digite o seu telefone"
                {...register("phone")}
              />

              <label>Foto (URL)</label>
              <input
                type="url"
                placeholder="Digite o link da sua foto"
                {...register("picture")}
              />

              <button type="submit" className="register">
                Cadastrar
              </button>
            </form>
          </>
        )}
        {isAbrigado && (
          <>
            <form onSubmit={handleSubmit(onSubmitFunction)}>
              <label>Nome Abrigado</label>
              <input
                type="text"
                placeholder="Digite o nome"
                {...register("name")}
              />

              <label>CPF</label>
              <input
                type="text"
                placeholder="Digite o CPF Ex: 000.000.000-00"
                {...register("cpf")}
              />

              <label>Email</label>
              <input
                type="email"
                placeholder="Digite o email"
                {...register("email")}
              />

              <label>Senha</label>
              <input
                type="password"
                placeholder="Digite a senha"
                {...register("password")}
              />

              <label>Idade</label>
              <input
                type="text"
                placeholder="Digite sua idade"
                {...register("age")}
              />

              <label>Telefone</label>
              <input
                type="phone"
                placeholder="Digite o seu telefone"
                {...register("phone")}
              />

              <label>Foto (URL)</label>
              <input
                type="url"
                placeholder="Digite o link da sua foto"
                {...register("picture")}
              />

              <label>Descrição</label>
              <textarea
                placeholder="Digite uma breve descrição"
                rows={3}
                {...register("description")}
              />

              <label>Instituição</label>
              <select {...register("institutionId")}>
                <option value="">Selecione uma instituição</option>
                {institutions.map((institution) => (
                  <option key={institution.id} value={institution.id}>
                    {institution.name}
                  </option>
                ))}
              </select>
              {errors.institutionId && (
                <span style={{ color: 'red', fontSize: '12px' }}>
                  {errors.institutionId.message}
                </span>
              )}

              <button type="submit" className="register">
                Cadastrar
              </button>
            </form>
          </>
        )}

        <div id="toggleLogin">
          <p>
            Já tem cadastro?{" "}
            <button type="button" onClick={() => setIsRegister(false)}>
              Fazer login
            </button>
          </p>
        </div>

        <ToastContainer />
      </section>
    </DivBack>
  );
}
