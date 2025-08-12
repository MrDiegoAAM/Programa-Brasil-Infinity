-- Criar tabela de instituições
CREATE TABLE IF NOT EXISTS institutions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  cnpj TEXT,
  address TEXT,
  telephone TEXT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  picture TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criar tabela de abrigados
CREATE TABLE IF NOT EXISTS homeless (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  password TEXT,
  telephone TEXT,
  address TEXT,
  age TEXT,
  cpf TEXT,
  rg TEXT,
  birth_date TEXT,
  picture TEXT,
  institution_id TEXT REFERENCES institutions(id),
  institution_name TEXT,
  registered_by TEXT DEFAULT 'self',
  has_login BOOLEAN DEFAULT false,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_institutions_email ON institutions(email);
CREATE INDEX IF NOT EXISTS idx_homeless_email ON homeless(email);
CREATE INDEX IF NOT EXISTS idx_homeless_institution_id ON homeless(institution_id);

-- Criar função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Criar triggers para atualizar updated_at
CREATE TRIGGER update_institutions_updated_at 
    BEFORE UPDATE ON institutions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_homeless_updated_at 
    BEFORE UPDATE ON homeless 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS (Row Level Security)
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE homeless ENABLE ROW LEVEL SECURITY;

-- Criar políticas de segurança (permitir todas as operações por enquanto)
CREATE POLICY "Enable all operations for institutions" ON institutions
    FOR ALL USING (true);

CREATE POLICY "Enable all operations for homeless" ON homeless
    FOR ALL USING (true);