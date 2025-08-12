const supabase = require('../config/supabase');

class SupabaseDatabase {
  constructor() {
    this.initializeTables();
  }

  async initializeTables() {
    try {
      // Verificar se as tabelas existem, se não, criar
      await this.createTablesIfNotExist();
    } catch (error) {
      console.error('Erro ao inicializar tabelas:', error);
    }
  }

  async createTablesIfNotExist() {
    // As tabelas serão criadas via SQL no Supabase Dashboard
    // Este método pode ser usado para verificar se existem
    console.log('🔄 Verificando tabelas no Supabase...');
  }

  // Métodos para Instituições
  async getInstitutions() {
    try {
      const { data, error } = await supabase
        .from('institutions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erro ao buscar instituições:', error);
      return [];
    }
  }

  async addInstitution(institution) {
    try {
      const { data, error } = await supabase
        .from('institutions')
        .insert([institution])
        .select();
      
      if (error) throw error;
      return data && data.length > 0;
    } catch (error) {
      console.error('Erro ao adicionar instituição:', error);
      return false;
    }
  }

  async updateInstitution(id, updatedData) {
    try {
      const { data, error } = await supabase
        .from('institutions')
        .update(updatedData)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data && data.length > 0;
    } catch (error) {
      console.error('Erro ao atualizar instituição:', error);
      return false;
    }
  }

  async deleteInstitution(id) {
    try {
      const { error } = await supabase
        .from('institutions')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erro ao deletar instituição:', error);
      return false;
    }
  }

  async findInstitutionById(id) {
    try {
      const { data, error } = await supabase
        .from('institutions')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Erro ao buscar instituição por ID:', error);
      return null;
    }
  }

  async findInstitutionByEmail(email) {
    try {
      const { data, error } = await supabase
        .from('institutions')
        .select('*')
        .eq('email', email)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Erro ao buscar instituição por email:', error);
      return null;
    }
  }

  // Métodos para Abrigados
  async getHomeless() {
    try {
      const { data, error } = await supabase
        .from('homeless')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erro ao buscar abrigados:', error);
      return [];
    }
  }

  async addHomeless(homeless) {
    try {
      const { data, error } = await supabase
        .from('homeless')
        .insert([homeless])
        .select();
      
      if (error) throw error;
      return data && data.length > 0;
    } catch (error) {
      console.error('Erro ao adicionar abrigado:', error);
      return false;
    }
  }

  async updateHomeless(id, updatedData) {
    try {
      const { data, error } = await supabase
        .from('homeless')
        .update(updatedData)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data && data.length > 0;
    } catch (error) {
      console.error('Erro ao atualizar abrigado:', error);
      return false;
    }
  }

  async deleteHomeless(id) {
    try {
      const { error } = await supabase
        .from('homeless')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erro ao deletar abrigado:', error);
      return false;
    }
  }

  async findHomelessById(id) {
    try {
      const { data, error } = await supabase
        .from('homeless')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Erro ao buscar abrigado por ID:', error);
      return null;
    }
  }

  async findHomelessByEmail(email) {
    try {
      const { data, error } = await supabase
        .from('homeless')
        .select('*')
        .eq('email', email)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Erro ao buscar abrigado por email:', error);
      return null;
    }
  }

  async findHomelessByInstitution(institutionId) {
    try {
      const { data, error } = await supabase
        .from('homeless')
        .select('*')
        .eq('institution_id', institutionId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erro ao buscar abrigados por instituição:', error);
      return [];
    }
  }

  // Método para recarregar dados (não necessário no Supabase)
  reload() {
    console.log('🔄 Dados sempre atualizados no Supabase');
  }

  // Método para salvar todos os dados (não necessário no Supabase)
  saveAll() {
    console.log('💾 Dados salvos automaticamente no Supabase');
    return true;
  }
}

module.exports = SupabaseDatabase;