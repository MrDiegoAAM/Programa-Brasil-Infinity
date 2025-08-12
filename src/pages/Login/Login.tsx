import Header from "../../components/Header/Header";
import { DivBack } from "./styles";
import ModalRegister from "../../components/ModalRegister/ModalRegister";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import api from "../../server/api";
import Footer from "../../components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ILoginPerson {
  email: string;
  password: string;
}

export default function Login() {
  const { isLogin, setIsLogin, isRegister, setIsRegister, loadUserProfile } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const customId = "custom-id-yes";

  const formSchema = yup.object().shape({
    email: yup.string().email().required("Email obrigatório"),
    password: yup.string().required("Senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginPerson>({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = async (data: ILoginPerson) => {
    try {
      console.log("Tentando fazer login com:", { email: data.email, password: "***" });
      const res = await api.post("/login", {
        email: data.email,
        password: data.password,
      });
      console.log("Resposta do login:", res.data);

      if (res.status === 200) {
        console.log(res.data.token);
        
        if (!res.data.token || !res.data.token.token) {
          throw new Error("Token não recebido do servidor");
        }

        const { token, type } = res.data.token;
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        localStorage.setItem("@TOKEN", token);
        localStorage.setItem("@type", type);
        
        console.log(`Login como ${type} realizado com sucesso`);
        
        // Carregar perfil do usuário após um pequeno delay para garantir que o localStorage seja atualizado
        setTimeout(() => {
          console.log("🚀 Chamando loadUserProfile após delay");
          loadUserProfile();
        }, 100);
        
        toast.success("Login realizado com sucesso", {
          autoClose: 1500,
          toastId: customId,
        });
        setTimeout(() => {
          setIsLogin(true);
          // Redireciona abrigados para o perfil, instituições para pesquisa
          if (type === "abrigado") {
            console.log("Redirecionando abrigado para /profile");
            navigate("/profile", { replace: true });
          } else {
            console.log("Redirecionando instituição para /pesquisapessoas");
            navigate("/pesquisapessoas", { replace: true });
          }
        }, 2500);
      }
    } catch (error: any) {
      console.error("Erro no login:", error);
      
      if (error.response) {
        // Erro de resposta do servidor
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
        toast.error(`Erro no login: ${error.response.data.message || "Credenciais inválidas"}`);
      } else if (error.request) {
        // Erro de rede
        console.error("Erro de rede:", error.request);
        toast.error("Erro de conexão. Verifique se o servidor está rodando.");
      } else {
        // Outros erros
        console.error("Erro:", error.message);
        toast.error(`Erro no login: ${error.message}`);
      }
    }
  };

  return (
    <>
      <Header />
      {!isLogin &&
        (!isRegister ? (
          <>
            <DivBack>
              <form onSubmit={handleSubmit(onSubmitFunction)}>
                <h3>Login</h3>
                <label>Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Digite seu email"
                  required
                  {...register("email")}
                />
                <label>Senha</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Digite sua senha"
                  {...register("password")}
                />

                <button type="submit" className="register">
                  Logar
                </button>
                <div>
                  <p>
                    Ainda não tem cadastro?{" "}
                    <button type="button" onClick={() => setIsRegister(true)}>
                      cadastre-se
                    </button>
                  </p>
                </div>
              </form>
              <ToastContainer />
            </DivBack>
            <Footer color={"#0057FF"} />
          </>
        ) : (
          <>
            <ModalRegister />
            <Footer color={"#0057FF"} />
          </>
        ))}
    </>
  );
}
