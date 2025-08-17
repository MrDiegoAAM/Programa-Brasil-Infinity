import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '../../services/supabase';
import { useAuth } from './SupabaseAuthContext';
import { toast } from 'react-toastify';

interface Institution {
  id: string;
  name: string;
  cnpj: string;
  address?: string;
  telephone?: string;
  email: string;
  picture?: string;
  created_at: string;
  updated_at: string;
}

interface Homeless {
  id: string;
  name: string;
  email?: string;
  telephone?: string;
  address?: string;
  age?: string;
  cpf?: string;
  rg?: string;
  birth_date?: string;
  picture?: string;
  institution_id?: string;
  institution_name?: string;
  registered_by: string;
  has_login: boolean;
  description?: string;
  created_at: string;
  updated_at: string;
}

interface DataContextType {
  institutions: Institution[];
  homeless: Homeless[];
  userProfile: Institution | Homeless | null;
  loading: boolean;
  loadInstitutions: () => Promise<void>;
  loadHomeless: () => Promise<void>;
  loadUserProfile: () => Promise<void>;
  createInstitution: (data: Partial<Institution>) => Promise<void>;
  createHomeless: (data: Partial<Homeless>) => Promise<void>;
  updateInstitution: (id: string, data: Partial<Institution>) => Promise<void>;
  updateHomeless: (id: string, data: Partial<Homeless>) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [homeless, setHomeless] = useState<Homeless[]>([]);
  const [userProfile, setUserProfile] = useState<Institution | Homeless | null>(null);
  const [loading, setLoading] = useState(false);

  const loadInstitutions = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('institutions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setInstitutions(data || []);
    } catch (error: any) {
      console.error('Erro ao carregar instituições:', error);
      toast.error('Erro ao carregar instituições');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadHomeless = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('homeless')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setHomeless(data || []);
    } catch (error: any) {
      console.error('Erro ao carregar abrigados:', error);
      toast.error('Erro ao carregar abrigados');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadUserProfile = useCallback(async () => {
    if (!user) {
      console.log('❌ loadUserProfile: Usuário não encontrado');
      return;
    }

    try {
      setLoading(true);
      console.log('🔍 loadUserProfile: Buscando perfil para:', user.email);
      
      // Primeiro, tentar encontrar nas instituições
      const { data: institutionData, error: instError } = await supabase
        .from('institutions')
        .select('*')
        .eq('email', user.email)
        .single();

      console.log('🏥 Resultado institutions:', { data: institutionData, error: instError });

      if (!instError && institutionData) {
        console.log('✅ Perfil encontrado nas instituições:', institutionData.name);
        setUserProfile(institutionData);
        return;
      }

      // Se não encontrou nas instituições, tentar nos abrigados
      const { data: homelessData, error: homelessError } = await supabase
        .from('homeless')
        .select('*')
        .eq('email', user.email)
        .single();

      console.log('👥 Resultado homeless:', { data: homelessData, error: homelessError });

      if (!homelessError && homelessData) {
        console.log('✅ Perfil encontrado nos homeless:', homelessData.name);
        setUserProfile(homelessData);
        return;
      }

      console.log('❌ Perfil não encontrado nas tabelas para email:', user.email);
    } catch (error: any) {
      console.error('❌ Erro ao carregar perfil do usuário:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const createInstitution = async (data: Partial<Institution>) => {
    try {
      setLoading(true);
      const { data: newInstitution, error } = await supabase
        .from('institutions')
        .insert([data])
        .select()
        .single();

      if (error) {
        throw error;
      }

      setInstitutions(prev => [newInstitution, ...prev]);
      toast.success('Instituição criada com sucesso!');
    } catch (error: any) {
      console.error('Erro ao criar instituição:', error);
      toast.error('Erro ao criar instituição');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createHomeless = async (data: Partial<Homeless>) => {
    try {
      setLoading(true);
      const { data: newHomeless, error } = await supabase
        .from('homeless')
        .insert([data])
        .select()
        .single();

      if (error) {
        throw error;
      }

      setHomeless(prev => [newHomeless, ...prev]);
      toast.success('Pessoa cadastrada com sucesso!');
    } catch (error: any) {
      console.error('Erro ao cadastrar pessoa:', error);
      toast.error('Erro ao cadastrar pessoa');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateInstitution = async (id: string, data: Partial<Institution>) => {
    try {
      setLoading(true);
      const { data: updatedInstitution, error } = await supabase
        .from('institutions')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      setInstitutions(prev => 
        prev.map(inst => inst.id === id ? updatedInstitution : inst)
      );
      
      if (userProfile && 'cnpj' in userProfile && userProfile.id === id) {
        setUserProfile(updatedInstitution);
      }
      
      toast.success('Instituição atualizada com sucesso!');
    } catch (error: any) {
      console.error('Erro ao atualizar instituição:', error);
      toast.error('Erro ao atualizar instituição');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateHomeless = async (id: string, data: Partial<Homeless>) => {
    try {
      setLoading(true);
      
      // Mapear institutionId para institution_id se presente
      const mappedData = { ...data };
      if ('institutionId' in mappedData) {
        mappedData.institution_id = (mappedData as any).institutionId;
        delete (mappedData as any).institutionId;
      }
      
      const { data: updatedHomeless, error } = await supabase
        .from('homeless')
        .update(mappedData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      setHomeless(prev => 
        prev.map(person => person.id === id ? updatedHomeless : person)
      );
      
      if (userProfile && 'cpf' in userProfile && userProfile.id === id) {
        setUserProfile(updatedHomeless);
      }
      
      toast.success('Dados atualizados com sucesso!');
    } catch (error: any) {
      console.error('Erro ao atualizar dados:', error);
      toast.error('Erro ao atualizar dados');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Carregar dados quando o usuário fizer login
  useEffect(() => {
    if (user) {
      loadUserProfile();
      loadInstitutions();
      loadHomeless();
    } else {
      setUserProfile(null);
      setInstitutions([]);
      setHomeless([]);
    }
  }, [user, loadUserProfile, loadInstitutions, loadHomeless]);

  const value = {
    institutions,
    homeless,
    userProfile,
    loading,
    loadInstitutions,
    loadHomeless,
    loadUserProfile,
    createInstitution,
    createHomeless,
    updateInstitution,
    updateHomeless,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};