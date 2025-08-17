import { ReactNode, createContext, useState, useEffect } from "react";
import { IRegisterPerson } from "../../pages/DashBoard/DashBoard";
import api from "../../server/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import jwt from "jsonwebtoken"; // Removido - não utilizado
import { useAuth } from "./SupabaseAuthContext";
import { useData } from "./DataContext";

// interface IHomelessProps {
//   img: string;
//   name: string;
//   CPF: number;
//   age: number;
//   state: string;
//   lastLocation: string;
//   contact: number;
// } // Removido - não utilizado

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

// const customId = "custom-id-yes"; // Removido - não utilizado

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
  const { user: supabaseUser, session, signOut: supabaseSignOut } = useAuth();
  const { userProfile, homeless: supabaseHomeless, loadHomeless } = useData();

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
      clearAuthData();
    }
  }, [supabaseUser, userProfile, session]);

  // Função para mapear dados do Supabase para o formato do AuthContext
  const mapHomelessToRegisterPerson = (homeless: any[]): IRegisterPerson[] => {
    return homeless.map((person: any) => ({
      id: person.id,
      name: person.name,
      age: person.age ? parseInt(person.age) : 0,
      cpf: person.cpf || '',
      telephone: person.telephone || '',
      address: person.address || '',
      description: person.description || '',
      institution: person.institution_name || 'Não informado',
      picture: person.picture || '',
      contact: person.telephone || '',
      created_at: person.created_at,
      abrigado: person.name
    }));
  };

  // Sincronizar dados de abrigados do Supabase com AuthContext
  useEffect(() => {
    if (supabaseHomeless && supabaseHomeless.length > 0) {
      console.log("🔄 Sincronizando dados de abrigados do Supabase...");
      const mappedData = mapHomelessToRegisterPerson(supabaseHomeless);
      setHomeLess(mappedData);
    }
  }, [supabaseHomeless]);

  const logout = async () => {
    try {
      // Usar o signOut do Supabase em vez da lógica antiga
      await supabaseSignOut();
      
      // Limpar dados do AuthContext tradicional
      localStorage.clear();
      setIsLogin(false);
      setIsAbrigado(false);
      setIsInstitution(false);
      setToken(null);
      setHomeLess([]);
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
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const clearAuthData = () => {
    console.log("🧹 Limpando dados de autenticação...");
    localStorage.clear();
    setIsLogin(false);
    setToken(null);
    setIsAbrigado(false);
    setIsInstitution(false);
    setHomeLess([]);
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
        console.log("👤 Usuário é um abrigado - dados já carregados pelo Supabase");
        // Os dados já foram carregados pelo useEffect do Supabase acima
      } else if (type === "institution") {
        console.log("🏢 Usuário é uma instituição - dados já carregados pelo Supabase");
        // Os dados já foram carregados pelo useEffect do Supabase acima
        // Apenas carregar abrigados usando DataContext do Supabase
        console.log("🔄 Carregando abrigados via DataContext...");
        loadHomeless();
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
  }, [loadUserProfile]); // Adicionar dependência loadUserProfile

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
    console.log("🔍 Buscando por:", searchFor);
    if (supabaseHomeless && supabaseHomeless.length > 0) {
      const filteredData = supabaseHomeless.filter((item: any) => 
        item.name.toLowerCase().includes(searchFor.toLowerCase()) ||
        item.cpf?.includes(searchFor) ||
        item.rg?.includes(searchFor)
      );
      console.log("✅ Resultados da busca:", filteredData);
      const mappedFilteredData = mapHomelessToRegisterPerson(filteredData);
      setHomeLess(mappedFilteredData);
    } else {
      console.log("⚠️ Nenhum dado disponível para busca");
      toast.warning("Nenhum dado disponível para busca");
    }
  }

  useEffect(() => {
    // Usar dados do Supabase em vez de fazer chamadas diretas para API
    if (isLogin && supabaseHomeless) {
      console.log("🔄 Usando dados do Supabase para abrigados...");
      const mappedData = mapHomelessToRegisterPerson(supabaseHomeless);
      setHomeLess(mappedData);
    }
  }, [nextPage, isLogin, supabaseHomeless]);

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
