require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

console.log('🔧 Configuração do Supabase:');
console.log(`URL: ${supabaseUrl}`);
console.log(`Key: ${supabaseKey ? supabaseKey.substring(0, 20) + '...' : 'não definida'}`);

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variáveis de ambiente SUPABASE_URL e SUPABASE_ANON_KEY são obrigatórias');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabase() {
  console.log('🚀 Testando conexão com Supabase...');

  try {
    // Testar conexão básica
    const { data, error } = await supabase.auth.getSession();
    console.log('✅ Conexão com Supabase estabelecida');

    // Tentar listar tabelas existentes
    console.log('📋 Tentando listar tabelas...');
    
    // Usar uma query SQL simples para verificar se as tabelas existem
    const { data: tables, error: tablesError } = await supabase
      .rpc('get_tables')
      .select();

    if (tablesError) {
      console.log('⚠️  Não foi possível listar tabelas via RPC:', tablesError.message);
    } else {
      console.log('📊 Tabelas encontradas:', tables);
    }

    // Tentar acessar as tabelas diretamente
    console.log('🔍 Testando acesso às tabelas...');
    
    const { data: instTest, error: instError } = await supabase
      .from('institutions')
      .select('count', { count: 'exact', head: true });

    if (instError) {
      console.log('❌ Erro ao acessar tabela institutions:', instError);
    } else {
      console.log('✅ Tabela institutions acessível');
    }

    const { data: homelessTest, error: homelessError } = await supabase
      .from('homeless')
      .select('count', { count: 'exact', head: true });

    if (homelessError) {
      console.log('❌ Erro ao acessar tabela homeless:', homelessError);
    } else {
      console.log('✅ Tabela homeless acessível');
    }

    // Se chegou até aqui, as tabelas existem
    if (!instError && !homelessError) {
      console.log('🎉 Todas as tabelas estão acessíveis!');
      console.log('📝 Agora você pode executar a migração:');
      console.log('   node scripts/migrate-to-supabase.js');
    } else {
      console.log('⚠️  Algumas tabelas não estão acessíveis.');
      console.log('📋 Execute o SQL no Supabase Dashboard:');
      console.log('🔗 https://supabase.com/dashboard/project/aadeajsyatbnkwasiqyj/sql');
      console.log('');
      console.log('-- Cole este SQL:');
      console.log(`
CREATE TABLE IF NOT EXISTS institutions (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  cnpj VARCHAR(18) UNIQUE NOT NULL,
  address TEXT,
  telephone VARCHAR(20),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  picture TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS homeless (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  password VARCHAR(255),
  telephone VARCHAR(20),
  address TEXT,
  age VARCHAR(10),
  cpf VARCHAR(14),
  rg VARCHAR(20),
  birth_date VARCHAR(10),
  picture TEXT,
  institution_id VARCHAR(255),
  institution_name VARCHAR(255),
  registered_by VARCHAR(50) DEFAULT 'self',
  has_login BOOLEAN DEFAULT false,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE SET NULL
);

-- Habilitar RLS
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE homeless ENABLE ROW LEVEL SECURITY;

-- Políticas para permitir todas as operações
CREATE POLICY "Allow all operations on institutions" ON institutions
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on homeless" ON homeless
  FOR ALL USING (true) WITH CHECK (true);
      `);
    }

  } catch (error) {
    console.error('❌ Erro ao testar Supabase:', error);
  }
}

testSupabase();