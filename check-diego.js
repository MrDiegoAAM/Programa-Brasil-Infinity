require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY
);

async function checkDiego() {
  console.log('🔍 Verificando dados do Diego...');
  
  try {
    const { data, error } = await supabase
      .from('homeless')
      .select('*')
      .eq('email', 'diegoaam@hotmail.com')
      .single();
    
    if (error) {
      console.log('❌ Erro:', error.message);
      return;
    }
    
    console.log('📋 Dados do Diego Madeira:');
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        console.log(`  ${key}: ${value}`);
      } else {
        console.log(`  ${key}: (vazio)`);
      }
    });
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

checkDiego();