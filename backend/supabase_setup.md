# Configuração do Supabase

## Passo 1: Acessar o SQL Editor

1. Acesse: https://supabase.com/dashboard/project/aadeajsyatbnkwasiqyj/sql
2. Faça login na sua conta Supabase

## Passo 2: Executar o SQL para criar as tabelas

Cole e execute o seguinte SQL no editor:

```sql
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
```

## Passo 3: Verificar se as tabelas foram criadas

Após executar o SQL, você pode verificar se as tabelas foram criadas executando:

```sql
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
```

## Passo 4: Executar a migração

Após criar as tabelas, execute o script de migração:

```bash
node scripts/migrate-to-supabase.js
```

## Passo 5: Iniciar o servidor Supabase

Após a migração bem-sucedida, inicie o servidor que usa Supabase:

```bash
node server-supabase.js
```

## Configuração das variáveis de ambiente

Certifique-se de que o arquivo `.env` contém:

```
SUPABASE_URL=https://aadeajsyatbnkwasiqyj.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhZGVhanN5YXRibmt3YXNpcXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5NTU4MDIsImV4cCI6MjA3MDUzMTgwMn0.fquqSawX8BtEFEoJqs16mEkcs4FlO950foOzBWacHMM
JWT_SECRET=social-dev-secret-key
PORT=3001
NODE_ENV=production
```

## Estrutura das tabelas

### Tabela `institutions`
- `id`: Identificador único da instituição
- `name`: Nome da instituição
- `cnpj`: CNPJ da instituição
- `address`: Endereço
- `telephone`: Telefone
- `email`: Email (único)
- `password`: Senha criptografada
- `picture`: URL da foto
- `created_at`: Data de criação
- `updated_at`: Data de atualização

### Tabela `homeless`
- `id`: Identificador único do abrigado
- `name`: Nome do abrigado
- `email`: Email (opcional)
- `password`: Senha criptografada (opcional)
- `telephone`: Telefone
- `address`: Endereço
- `age`: Idade
- `cpf`: CPF
- `rg`: RG
- `birth_date`: Data de nascimento
- `picture`: URL da foto
- `institution_id`: ID da instituição responsável
- `institution_name`: Nome da instituição responsável
- `registered_by`: Quem registrou ('self' ou 'institution')
- `has_login`: Se tem login habilitado
- `description`: Descrição adicional
- `created_at`: Data de criação
- `updated_at`: Data de atualização