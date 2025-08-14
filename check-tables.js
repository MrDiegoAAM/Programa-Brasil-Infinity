require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  // Para scripts de desenvolvimento, use variável de ambiente do sistema
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkTables() {
  console.log('🔍 Verificando dados nas tabelas...');
  
  try {
    // Verificar instituições
    const { data: institutions, error: instError } = await supabase
      .from('institutions')
      .select('id, name, email')
      .limit(10);
    
    console.log('🏥 Instituições encontradas:', institutions?.length || 0);
    if (institutions) {
      institutions.forEach(inst => {
        console.log(`  - ${inst.name}: ${inst.email}`);
      });
    }
    if (instError) console.log('❌ Erro institutions:', instError.message);
    
    // Verificar homeless
    const { data: homeless, error: homelessError } = await supabase
      .from('homeless')
      .select('id, name, email')
      .limit(10);
    
    console.log('\n👥 Homeless encontrados:', homeless?.length || 0);
    if (homeless) {
      homeless.forEach(person => {
        console.log(`  - ${person.name}: ${person.email || 'sem email'}`);
      });
    }
    if (homelessError) console.log('❌ Erro homeless:', homelessError.message);
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

checkTables();