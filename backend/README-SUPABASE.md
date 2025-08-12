# Migração para Supabase - Backend Social Dev

## ✅ Status da Migração

### Arquivos Criados:
- ✅ `.env` - Configurações do Supabase
- ✅ `config/supabase.js` - Cliente Supabase
- ✅ `data/supabaseDatabase.js` - Camada de dados Supabase
- ✅ `server-supabase.js` - Servidor usando Supabase
- ✅ `scripts/create-tables.js` - Script para criar tabelas
- ✅ `scripts/migrate-to-supabase.js` - Script de migração
- ✅ `sql/create_tables.sql` - SQL das tabelas
- ✅ `SUPABASE_SETUP.md` - Guia de configuração

### Dependências Instaladas:
- ✅ `@supabase/supabase-js`
- ✅ `dotenv`

## 🚀 Próximos Passos

### 1. Criar Tabelas no Supabase
Execute o SQL do arquivo `SUPABASE_SETUP.md` no dashboard do Supabase:
- Acesse: https://supabase.com/dashboard/project/aadeajsyatbnkwasiqyj/sql
- Cole e execute o SQL fornecido

### 2. Migrar Dados
Após criar as tabelas, execute:
```bash
npm run migrate
```
ou
```bash
node scripts/migrate-to-supabase.js
```

### 3. Iniciar Servidor Supabase
```bash
npm run start:supabase
```
ou
```bash
node server-supabase.js
```

## 📊 Dados Atuais para Migração

### Instituições (2):
1. **Lar São Vicente de Paulo**
   - CNPJ: 12.345.678/0001-90
   - Email: contato@larsaovicente.org.br

2. **Casa de Apoio Esperança**
   - CNPJ: 98.765.432/0001-10
   - Email: contato@casaesperanca.org.br

### Pessoas em Situação de Rua (5):
1. **João Silva** - Registrado por instituição
2. **Maria Santos** - Registrado por instituição  
3. **Pedro Oliveira** - Auto-registrado
4. **Ana Costa** - Auto-registrada
5. **Diego Madeira** - Auto-registrado (mais recente)

## 🔧 Scripts Disponíveis

```bash
# Servidor original (JSON)
npm start

# Servidor Supabase
npm run start:supabase

# Desenvolvimento com nodemon
npm run dev:supabase

# Migração de dados
npm run migrate

# Criar tabelas (mostra SQL)
npm run create-tables
```

## 🌐 URLs do Projeto

- **Supabase Dashboard**: https://supabase.com/dashboard/project/aadeajsyatbnkwasiqyj
- **API URL**: https://aadeajsyatbnkwasiqyj.supabase.co
- **Frontend Local**: http://localhost:3000
- **Backend Supabase**: http://localhost:3001

## 🔐 Configuração de Ambiente

O arquivo `.env` contém:
```
SUPABASE_URL=https://aadeajsyatbnkwasiqyj.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
JWT_SECRET=social-dev-secret-key
PORT=3001
NODE_ENV=production
```

## 📋 Endpoints Disponíveis

### Autenticação
- `POST /api/login` - Login de usuários
- `GET /api/status` - Status do servidor

### Instituições
- `POST /api/register/institution` - Registrar instituição
- `GET /api/institutions` - Listar instituições
- `GET /api/profile/institution/:id` - Perfil da instituição
- `PUT /api/profile/institution/:id` - Atualizar instituição

### Pessoas em Situação de Rua
- `POST /api/register/homeless` - Registrar pessoa
- `GET /api/homeless` - Listar pessoas
- `GET /api/profile/homeless/:id` - Perfil da pessoa
- `PUT /api/profile/homeless/:id` - Atualizar pessoa

## 🎯 Benefícios da Migração

1. **Escalabilidade**: Banco PostgreSQL gerenciado
2. **Autenticação**: Sistema robusto do Supabase
3. **Real-time**: Capacidades de tempo real
4. **Backup**: Backup automático dos dados
5. **Performance**: Otimizações automáticas
6. **Segurança**: RLS (Row Level Security)

## 🔄 Rollback

Se necessário, o servidor original ainda está disponível:
```bash
npm start
```

Os dados JSON originais estão preservados em:
- `data/institutions.json`
- `data/homeless.json`