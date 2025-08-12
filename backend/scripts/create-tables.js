require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variáveis de ambiente SUPABASE_URL e SUPABASE_SERVICE_KEY são obrigatórias');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createTables() {
  console.log('🚀 Criando tabelas no Supabase...');
  console.log('📋 Você precisa executar o seguinte SQL no SQL Editor do Supabase:');
  console.log('🔗 Acesse: https://supabase.com/dashboard/project/aadeajsyatbnkwasiqyj/sql');
  console.log('');
  console.log('-- SQL para criar as tabelas:');
  console.log('');

  const sql = `
-- Criar tabela institutions
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

-- Índices para institutions
CREATE INDEX IF NOT EXISTS idx_institutions_email ON institutions(email);
CREATE INDEX IF NOT EXISTS idx_institutions_cnpj ON institutions(cnpj);

-- Criar tabela homeless
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

-- Índices para homeless
CREATE INDEX IF NOT EXISTS idx_homeless_email ON homeless(email);
CREATE INDEX IF NOT EXISTS idx_homeless_institution_id ON homeless(institution_id);
CREATE INDEX IF NOT EXISTS idx_homeless_registered_by ON homeless(registered_by);

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
DROP TRIGGER IF EXISTS update_institutions_updated_at ON institutions;
CREATE TRIGGER update_institutions_updated_at
  BEFORE UPDATE ON institutions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_homeless_updated_at ON homeless;
CREATE TRIGGER update_homeless_updated_at
  BEFORE UPDATE ON homeless
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS (Row Level Security)
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE homeless ENABLE ROW LEVEL SECURITY;

-- Políticas para permitir todas as operações (para desenvolvimento)
DROP POLICY IF EXISTS "Allow all operations on institutions" ON institutions;
CREATE POLICY "Allow all operations on institutions" ON institutions
  FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all operations on homeless" ON homeless;
CREATE POLICY "Allow all operations on homeless" ON homeless
  FOR ALL USING (true) WITH CHECK (true);
`;

  console.log(sql);
  console.log('');
  console.log('📝 Copie e cole o SQL acima no SQL Editor do Supabase e execute.');
  console.log('⚡ Após executar o SQL, execute novamente o script de migração:');
  console.log('   node scripts/migrate-to-supabase.js');
  console.log('');

  // Tentar verificar se as tabelas já existem
  try {
    const { data: institutions, error: instError } = await supabase
      .from('institutions')
      .select('count', { count: 'exact', head: true });

    const { data: homeless, error: homelessError } = await supabase
      .from('homeless')
      .select('count', { count: 'exact', head: true });

    if (!instError && !homelessError) {
      console.log('✅ As tabelas já existem no Supabase!');
      console.log(`📊 Instituições: ${institutions?.length || 0}`);
      console.log(`👥 Abrigados: ${homeless?.length || 0}`);
      console.log('🚀 Você pode executar o script de migração agora:');
      console.log('   node scripts/migrate-to-supabase.js');
    } else {
      console.log('⚠️  As tabelas ainda não existem. Execute o SQL acima primeiro.');
    }
  } catch (error) {
    console.log('⚠️  As tabelas ainda não existem. Execute o SQL acima primeiro.');
  }
}

createTables();