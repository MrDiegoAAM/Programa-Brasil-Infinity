require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function testLogin() {
  console.log('🔐 Testando login...');
  
  try {
    // Fazer login
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'contato@ajudeme.org',
      password: '123456'
    });
    
    if (error) {
      console.log('❌ Erro no login:', error.message);
      return;
    }
    
    console.log('✅ Login realizado com sucesso!');
    console.log('👤 Usuário:', data.user.email);
    
    // Buscar perfil nas instituições
    const { data: institutionData, error: instError } = await supabase
      .from('institutions')
      .select('*')
      .eq('email', data.user.email)
      .single();
    
    console.log('🏥 Resultado institutions:', { 
      found: !!institutionData, 
      name: institutionData?.name,
      error: instError?.message 
    });
    
    // Buscar perfil nos homeless
    const { data: homelessData, error: homelessError } = await supabase
      .from('homeless')
      .select('*')
      .eq('email', data.user.email)
      .single();
    
    console.log('👥 Resultado homeless:', { 
      found: !!homelessData, 
      name: homelessData?.name,
      error: homelessError?.message 
    });
    
    // Fazer logout
    await supabase.auth.signOut();
    console.log('🚪 Logout realizado');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

testLogin();