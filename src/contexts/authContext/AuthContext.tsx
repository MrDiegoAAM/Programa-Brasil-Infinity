import { ReactNode, createContext, useState, useEffect } from "react";
import { IRegisterPerson } from "../../pages/DashBoard/DashBoard";
import api from "../../server/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import { useAuth } from "./SupabaseAuthContext";
import { useData } from "./DataContext";

interface IHomelessProps {
  img: string;
  name: string;
  CPF: number;
  age: number;
  state: string;
  lastLocation: string;
  contact: number;
}

interface IUser {
  name: string;
  cnpj: string;
  adress: string;
  contact: string;
  email: string;
  password: string;
  picture: string;
}

interface IUserConstext {
  user: IUser | any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isAbrigado: boolean;
  setIsAbrigado: React.Dispatch<React.SetStateAction<boolean>>;
  isInstitution: boolean;
  setIsInstitution: React.Dispatch<React.SetStateAction<boolean>>;
  token: string | null;
  logout(): void;
  loadUserProfile(): void;
  isModal: boolean;
  homeLess: IRegisterPerson[];
  searchFor: string;
  isNextDisabled: boolean;
  isGoBackDisabled: boolean;
  isRegister: boolean;
  setHomeLess: React.Dispatch<React.SetStateAction<IRegisterPerson[]>>;
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchFor: React.Dispatch<React.SetStateAction<string>>;
  goBack(): void;
  next(): void;
  search(): void;
}

interface IChildrenProps {
  children: ReactNode;
}

const customId = "custom-id-yes";

export const AuthContext = createContext<IUserConstext>({} as IUserConstext);

export default function AuthProvider({ children }: IChildrenProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [searchFor, setSearchFor] = useState("");
  const [nextPage, setNextPage] = useState(1);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isGoBackDisabled, setIsGoBackDisabled] = useState(true);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [isInstitution, setIsInstitution] = useState(false);
  const [isAbrigado, setIsAbrigado] = useState(false);
  const [homeLess, setHomeLess] = useState<IRegisterPerson[]>([]);
  const [token, setToken] = useState<string | null>(null);
  
  // Integração com SupabaseAuthContext
  const { user: supabaseUser, session } = useAuth();
  const { userProfile } = useData();

  // Sincronizar estado de autenticação do Supabase com AuthContext tradicional
  useEffect(() => {
    console.log("🔄 Sincronizando estado de autenticação do Supabase...");
    console.log("👤 Usuário Supabase:", supabaseUser ? "Logado" : "Não logado");
    console.log("📋 Perfil do usuário:", userProfile);
    
    if (supabaseUser && userProfile) {
      console.log("✅ Usuário logado no Supabase, atualizando AuthContext tradicional...");
      setIsLogin(true);
      setUser(userProfile);
      
      // Determinar tipo de usuário baseado no perfil
      if ('cnpj' in userProfile) {
        console.log("🏢 Usuário é uma instituição");
        setIsInstitution(true);
        setIsAbrigado(false);
      } else if ('cpf' in userProfile) {
        console.log("👤 Usuário é um abrigado");
        setIsAbrigado(true);
        setIsInstitution(false);
      }
      
      // Simular token para compatibilidade com sistema antigo
      const mockToken = `supabase-${session?.access_token?.substring(0, 20) || 'mock'}`;
      setToken(mockToken);
      localStorage.setItem("@TOKEN", mockToken);
      localStorage.setItem("@type", 'cnpj' in userProfile ? "institution" : "abrigado");
      
    } else if (!supabaseUser) {
      console.log("❌ Usuário não logado no Supabase, limpando AuthContext tradicional...");
      setIsLogin(false);
      setUser({});
      setIsInstitution(false);
      setIsAbrigado(false);
      setToken(null);
      localStorage.removeItem("@TOKEN");
      localStorage.removeItem("@type");
    }
  }, [supabaseUser, userProfile, session]);

  const logout = () => {
    toast.success("Logout realizado com sucesso!", {
      autoClose: 1500,
      toastId: customId,
    });
    
    setTimeout(() => {
      localStorage.clear();
      setIsLogin(false);
      setIsAbrigado(false);
      setIsInstitution(false);
      setToken(null);
      setUser({
        id: "",
        name: "",
        email: "",
        telephone: "",
        address: "",
        cnpj: "",
        age: "",
        cpf: "",
        picture: "",
        search(): void {},
        logout(): void {}
      });
      delete api.defaults.headers.common.Authorization;
      navigate("/home", { replace: true });
    }, 2000);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const clearAuthData = () => {
    console.log("Limpando dados de autenticação...");
    localStorage.clear();
    setIsLogin(false);
    setToken(null);
    setIsAbrigado(false);
    setIsInstitution(false);
    setUser({});
    delete api.defaults.headers.common.Authorization;
  };

  const loadUserProfile = () => {
    console.log("🔄 loadUserProfile chamado");
    const storedToken = localStorage.getItem("@TOKEN");
    const type = localStorage.getItem("@type");
    
    console.log("📋 Token armazenado:", storedToken ? "Existe" : "Não existe");
    console.log("📋 Tipo armazenado:", type);
    
    if (storedToken && type) {
      console.log(`🚀 Carregando perfil do usuário, tipo: ${type}`);
      setToken(storedToken);
      setIsLogin(true);
      api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
      console.log("🔑 Authorization header configurado:", api.defaults.headers.common.Authorization);

      if (type === "abrigado") {
        console.log("📞 Fazendo requisição para /abrigados/profile");
        console.log("🌐 URL base da API:", api.defaults.baseURL);
        console.log("🔗 URL completa:", `${api.defaults.baseURL}/abrigados/profile`);
        api.get(`/abrigados/profile`).then((res) => {
          console.log("✅ Perfil do abrigado carregado:", res.data);
          console.log("🖼️ Foto do abrigado:", res.data.picture);
          console.log("🔄 Definindo isAbrigado como true");
          setIsAbrigado(true);
          setIsInstitution(false);
          setUser(res.data);
          toast.success("Perfil carregado com sucesso");
        }).catch((error) => {
          console.error("❌ Erro ao buscar perfil do abrigado:", error);
          console.error("❌ Detalhes do erro:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            config: error.config
          });
          
          // Fallback para dados mock quando Edge Functions não funcionam
          if (storedToken.includes("mock-signature")) {
            console.log("🔄 Usando dados mock para perfil do abrigado");
            const mockProfile = {
              id: 'test-123',
              name: 'Diego Teste',
              email: 'diegoaam@hotmail.com',
              age: 30,
              cpf: '123.456.789-00',
              rg: '12.345.678-9',
              birth_date: '1993-01-01',
              address: 'Endereço de Teste',
              telephone: '(11) 99999-9999',
              picture: "",
              description: 'Usuário de teste'
            };
            setIsAbrigado(true);
            setIsInstitution(false);
            setUser(mockProfile);
            console.log("✅ Perfil mock carregado:", mockProfile);
            toast.success("Perfil carregado com sucesso (modo teste)");
          } else {
            // Se houver erro de autenticação, limpar dados
            if (error.response?.status === 401 || error.response?.status === 403 || error.response?.status === 404) {
              console.log("🧹 Token inválido ou usuário não encontrado, limpando dados...");
              clearAuthData();
              toast.error("Sessão expirada. Faça login novamente.");
            } else {
              console.log("⚠️ Erro não relacionado à autenticação, mantendo dados...");
              toast.error("Erro ao carregar perfil. Tente novamente.");
            }
          }
        });
      } else if (type === "institution") {
        console.log("📞 Fazendo requisição para /register/institution/profile");
        api.get(`/register/institution/profile`).then((res) => {
          console.log("✅ Perfil da instituição carregado:", res.data);
          console.log("🖼️ Foto da instituição:", res.data.picture);
          setIsInstitution(true);
          setIsAbrigado(false);
          setUser(res.data);
          toast.success("Perfil da instituição carregado com sucesso");
          
          // Carregar abrigados da instituição após definir o tipo
          console.log("🔄 Carregando abrigados da instituição...");
          api.get("/homeless-by-institution").then((homelessRes) => {
            console.log("✅ Abrigados da instituição carregados:", homelessRes.data);
            setHomeLess(homelessRes.data);
          }).catch((homelessError) => {
            console.error("❌ Erro ao carregar abrigados da instituição:", homelessError);
            
            // Fallback para dados mock quando Edge Functions não funcionam
            if (storedToken.includes("mock-signature")) {
              console.log("🔄 Usando dados mock para lista de abrigados");
              const mockHomeless = [
                {
                  id: 1,
                  name: "João Silva",
                  age: 35,
                  cpf: "111.222.333-44",
                  telephone: "11999999999",
                  address: "Centro, São Paulo - SP",
                  state: "SP",
                  lastLocation: "Centro",
                  contact: "11999999999",
                  img: null,
                  institution: "Instituição Teste",
                  picture: ""
                },
                {
                  id: 2,
                  name: "Maria Santos",
                  age: 28,
                  cpf: "555.666.777-88",
                  telephone: "11888888888",
                  address: "Vila Madalena, São Paulo - SP",
                  state: "SP",
                  lastLocation: "Vila Madalena",
                  contact: "11888888888",
                  img: null,
                  institution: "Instituição Teste",
                  picture: ""
                }
              ];
              setHomeLess(mockHomeless);
              console.log("✅ Abrigados mock carregados:", mockHomeless);
            } else {
              toast.error("Erro ao carregar abrigados");
            }
          });
        }).catch((error) => {
          console.error("❌ Erro ao buscar perfil da instituição:", error);
          console.error("❌ Detalhes do erro:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            config: error.config
          });
          
          // Fallback para dados mock quando Edge Functions não funcionam
          if (storedToken.includes("mock-signature")) {
            console.log("🔄 Usando dados mock para perfil da instituição");
            const mockProfile = {
              id: 'inst-123',
              name: 'Instituição Teste',
              email: 'instituicao@teste.com',
              cnpj: '12.345.678/0001-90',
              address: 'Endereço da Instituição',
              telephone: '(11) 88888-8888',
              picture: "",
              description: 'Instituição de teste'
            };
            setIsInstitution(true);
            setIsAbrigado(false);
            setUser(mockProfile);
            console.log("✅ Perfil mock da instituição carregado:", mockProfile);
            toast.success("Perfil da instituição carregado com sucesso (modo teste)");
            
            // Carregar dados mock de abrigados
            const mockHomeless = [
               {
                 id: 1,
                 name: "João Silva",
                 age: 35,
                 cpf: "111.222.333-44",
                 telephone: "11999999999",
                 address: "Centro, São Paulo - SP",
                 state: "SP",
                 lastLocation: "Centro",
                 contact: "11999999999",
                 img: null,
                 institution: "Instituição Teste",
                 picture: ""
               },
               {
                 id: 2,
                 name: "Maria Santos",
                 age: 28,
                 cpf: "555.666.777-88",
                 telephone: "11888888888",
                 address: "Vila Madalena, São Paulo - SP",
                 state: "SP",
                 lastLocation: "Vila Madalena",
                 contact: "11888888888",
                 img: null,
                 institution: "Instituição Teste",
                 picture: ""
               }
             ];
            setHomeLess(mockHomeless);
            console.log("✅ Abrigados mock carregados:", mockHomeless);
          } else {
            // Se houver erro de autenticação, limpar dados
            if (error.response?.status === 401 || error.response?.status === 403 || error.response?.status === 404) {
              console.log("🧹 Token inválido ou instituição não encontrada, limpando dados...");
              clearAuthData();
              toast.error("Sessão expirada. Faça login novamente.");
            } else {
              console.log("⚠️ Erro não relacionado à autenticação, mantendo dados...");
              toast.error("Erro ao carregar perfil. Tente novamente.");
            }
          }
        });
      }
    } else {
      console.log("⚠️ Token ou tipo não encontrado no localStorage");
    }
  };

  // Inicialização do token e autenticação
  useEffect(() => {
    console.log("🔄 useEffect de inicialização executado");
    const storedToken = localStorage.getItem("@TOKEN");
    const type = localStorage.getItem("@type");
    
    console.log("📋 Token no useEffect:", storedToken ? "Existe" : "Não existe");
    console.log("📋 Tipo no useEffect:", type);
    
    if (storedToken && type) {
      console.log("✅ Token encontrado na inicialização, carregando perfil...");
      loadUserProfile();
    } else {
      console.log("⚠️ Nenhum token encontrado na inicialização");
      setIsLogin(false);
      setToken(null);
      setIsAbrigado(false);
      setIsInstitution(false);
      setUser({});
    }
  }, []); // Executar apenas uma vez na inicialização

  function next() {
    api
      .get("database", {
        params: {
          _page: nextPage + 1,
          _limit: 8,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          setNextPage(nextPage + 1);
        } else if (res.data.length < 0) {
          setIsNextDisabled(true);
        }
      });
    if (nextPage > 0) {
      setIsGoBackDisabled(false);
    }
  }

  function goBack() {
    api
      .get("database", {
        params: {
          _page: nextPage,
          _limit: 8,
        },
      })
      .then((res) => {
        if (nextPage <= 1) {
          setIsGoBackDisabled(false);
        } else if (nextPage > 1) {
          setIsGoBackDisabled(true);
          setIsNextDisabled(false);
        }
      });
    setNextPage(nextPage - 1);
  }

  function search() {
    const endpoint = isInstitution ? "/homeless-by-institution" : "/homeless";
    api.get(endpoint).then((res) => {
      console.log(res);
      setHomeLess([
        ...res.data.filter((item: any) => item.name.includes(searchFor)),
      ]);
    }).catch((error) => {
      console.error("Erro ao buscar abrigados:", error);
      toast.error("Erro ao carregar abrigados");
    });
  }

  useEffect(() => {
    // Só buscar dados se estiver logado
    if (isLogin && token) {
      const endpoint = isInstitution ? "/homeless-by-institution" : "/homeless";
      api
        .get(endpoint)
        .then((res) => {
          console.log(`✅ Dados carregados do endpoint ${endpoint}:`, res.data);
          setHomeLess(res.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados dos abrigados:", error);
          toast.error("Erro ao carregar abrigados");
        });
    }
  }, [nextPage, isLogin, token, isInstitution]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLogin,
        setIsLogin,
        isAbrigado,
        setIsAbrigado,
        isInstitution,
        setIsInstitution,
        token,
        logout,
        loadUserProfile,
        isModal,
        homeLess,
        searchFor,
        isNextDisabled,
        isGoBackDisabled,
        isRegister,
        setHomeLess,
        setIsRegister,
        setIsModal,
        setSearchFor,
        goBack,
        next,
        search,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
