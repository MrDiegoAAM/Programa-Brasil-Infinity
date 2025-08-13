# Migração para Supabase

Este documento descreve a migração do backend Node.js/Express para Supabase Edge Functions.

## Alterações Realizadas

### 1. Configuração do Cliente Supabase
- **Arquivo criado**: `src/services/supabase.ts`
- **Descrição**: Configuração do cliente Supabase com URLs e chaves de API

### 2. Modificação da API Base
- **Arquivo modificado**: `src/server/api.ts`
- **Alterações**:
  - Mudança do `baseURL` de `http://localhost:3001` para usar variáveis de ambiente
  - Adição de headers de autorização para Supabase
  - Aumento do timeout para 10000ms

### 3. Edge Functions Criadas

#### Status Function (`supabase/functions/status/index.ts`)
- **Endpoint**: `/functions/v1/status`
- **Método**: GET
- **Descrição**: Verifica se o Supabase está funcionando

#### Auth Function (`supabase/functions/auth/index.ts`)
- **Endpoint**: `/functions/v1/auth`
- **Método**: POST
- **Descrição**: Autenticação de usuários (instituições e abrigados)
- **Parâmetros**: `{ email, password }`

#### Homeless Function (`supabase/functions/homeless/index.ts`)
- **Endpoint**: `/functions/v1/homeless`
- **Método**: GET
- **Descrição**: Lista todos os abrigados com informações da instituição

#### Institutions Function (`supabase/functions/institutions/index.ts`)
- **Endpoint**: `/functions/v1/institutions`
- **Método**: GET
- **Descrição**: Lista todas as instituições

#### Homeless by Institution Function (`supabase/functions/homeless-by-institution/index.ts`)
- **Endpoint**: `/functions/v1/homeless-by-institution`
- **Método**: GET
- **Parâmetros**: `institutionId`, `page`, `limit`, `search`
- **Descrição**: Lista abrigados de uma instituição específica com paginação e busca

### 4. Modificações nos Componentes React

#### HomeLess.tsx
- **Arquivo modificado**: `src/pages/HomeLess/HomeLess.tsx`
- **Alterações**:
  - Adição de fallback para buscar dados diretamente do Supabase
  - Correção de tipos TypeScript
  - Mapeamento de dados para incluir nome da instituição

## Variáveis de Ambiente Necessárias

Copie o arquivo `.env.example` para `.env` e configure as seguintes variáveis:

```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
REACT_APP_FUNCTIONS_URL=https://your-project.supabase.co/functions/v1
```

## Estrutura do Banco de Dados

### Tabelas Principais

#### `institutions`
- `id` (uuid, primary key)
- `name` (text)
- `email` (text, unique)
- `password` (text, hashed)
- `cnpj` (text)
- `address` (text)
- `telephone` (text)
- `picture` (text)
- `created_at` (timestamp)

#### `homeless`
- `id` (uuid, primary key)
- `name` (text)
- `email` (text)
- `password` (text, hashed)
- `age` (integer)
- `cpf` (text)
- `rg` (text)
- `birth_date` (date)
- `address` (text)
- `telephone` (text)
- `picture` (text)
- `description` (text)
- `has_login` (boolean)
- `institution_id` (uuid, foreign key)
- `created_at` (timestamp)

## Como Executar

1. **Instalar dependências**:
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Configurar variáveis de ambiente**:
   ```bash
   cp .env.example .env
   # Editar .env com suas credenciais do Supabase
   ```

3. **Executar a aplicação**:
   ```bash
   npm start
   ```

## Próximos Passos

1. **Deploy das Edge Functions**: Fazer deploy das funções para o Supabase
2. **Configurar RLS**: Implementar Row Level Security nas tabelas
3. **Testes**: Testar todas as funcionalidades migradas
4. **Otimizações**: Implementar cache e otimizações de performance

## Benefícios da Migração

- **Escalabilidade**: Supabase oferece escalabilidade automática
- **Segurança**: RLS (Row Level Security) nativo
- **Performance**: Edge Functions executam próximo aos usuários
- **Manutenção**: Menos infraestrutura para gerenciar
- **Real-time**: Capacidades de tempo real nativas