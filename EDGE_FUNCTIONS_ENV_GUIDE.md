# Guia de Configuração de Variáveis de Ambiente para Edge Functions

## Visão Geral

Este guia documenta o processo correto de configuração de variáveis de ambiente para Edge Functions do Supabase, garantindo segurança e boas práticas.

## ⚠️ Problemas de Segurança Identificados

### Antes (Inseguro)
```typescript
// ❌ NUNCA faça isso - service key hardcoded
const supabaseAdmin = createClient(
  'https://your-project.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' // Service key exposta
)
```

### Depois (Seguro)
```typescript
// ✅ Forma correta - usando variáveis de ambiente
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)
```

## 🔧 Configuração no Supabase Dashboard

### 1. Acessar Configurações de Edge Functions
1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá para **Settings** → **Edge Functions**
4. Clique na aba **Environment Variables**

### 2. Adicionar Variáveis de Ambiente
Adicione as seguintes variáveis:

```bash
# URL do projeto Supabase
SUPABASE_URL=https://your-project-id.supabase.co

# Service Role Key (encontrada em Settings → API)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Anon Key (para operações públicas)
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Outras variáveis específicas do projeto
JWT_SECRET=your-jwt-secret
DATABASE_URL=postgresql://...
```

## 📝 Padrão de Código para Edge Functions

### Template Base
```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Configuração segura usando variáveis de ambiente
const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req) => {
  try {
    // Verificar método HTTP
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 })
    }

    // Processar requisição
    const { data } = await req.json()
    
    // Sua lógica aqui
    const result = await supabase
      .from('your_table')
      .insert(data)
    
    return new Response(
      JSON.stringify({ success: true, data: result }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
```

### Validação de Variáveis de Ambiente
```typescript
// Função para validar variáveis obrigatórias
function validateEnvVars() {
  const required = [
    'SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY'
  ]
  
  for (const envVar of required) {
    if (!Deno.env.get(envVar)) {
      throw new Error(`Missing required environment variable: ${envVar}`)
    }
  }
}

// Usar no início da função
serve(async (req) => {
  try {
    validateEnvVars()
    // resto da lógica...
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    )
  }
})
```

## 🚀 Deploy e Teste

### 1. Deploy da Edge Function
```bash
# Deploy com variáveis de ambiente
supabase functions deploy your-function-name

# Verificar se as variáveis estão configuradas
supabase functions list
```

### 2. Teste Local
```bash
# Criar arquivo .env.local para desenvolvimento
echo "SUPABASE_URL=https://your-project.supabase.co" > .env.local
echo "SUPABASE_SERVICE_ROLE_KEY=your-service-key" >> .env.local

# Servir localmente
supabase functions serve --env-file .env.local
```

### 3. Teste da Function
```bash
# Testar endpoint
curl -X POST 'https://your-project.supabase.co/functions/v1/your-function' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"test": "data"}'
```

## 🔒 Boas Práticas de Segurança

### 1. Nunca Commitar Secrets
```gitignore
# .gitignore
.env
.env.local
.env.production
*.key
*.pem
supabase/config.toml
```

### 2. Rotação de Chaves
- Rotacione service keys regularmente
- Use diferentes chaves para desenvolvimento e produção
- Monitore uso das chaves no dashboard

### 3. Princípio do Menor Privilégio
```sql
-- Criar roles específicas para Edge Functions
CREATE ROLE edge_function_role;

-- Conceder apenas permissões necessárias
GRANT SELECT, INSERT ON specific_table TO edge_function_role;

-- Usar essa role nas Edge Functions
```

### 4. Validação de Input
```typescript
// Sempre validar dados de entrada
function validateInput(data: any) {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid input data')
  }
  
  // Validações específicas
  if (!data.email || !isValidEmail(data.email)) {
    throw new Error('Valid email is required')
  }
  
  return data
}
```

## 📊 Monitoramento

### 1. Logs das Edge Functions
```bash
# Visualizar logs em tempo real
supabase functions logs your-function-name --follow

# Logs com filtro
supabase functions logs your-function-name --level error
```

### 2. Métricas no Dashboard
- Monitore invocações por minuto
- Verifique taxa de erro
- Analise tempo de resposta

## 🔄 CI/CD com Ionic Appflow

### 1. Configurar Variáveis no Appflow
1. Acesse o Ionic Appflow
2. Vá para **Settings** → **Environment Variables**
3. Adicione as mesmas variáveis do Supabase

### 2. Build Script
```json
{
  "scripts": {
    "build:mobile": "npm run build && npx cap sync",
    "deploy:functions": "supabase functions deploy --project-ref YOUR_PROJECT_REF"
  }
}
```

## ✅ Checklist de Segurança

- [ ] Service keys removidas do código
- [ ] Variáveis de ambiente configuradas no Supabase
- [ ] Validação de variáveis implementada
- [ ] .env adicionado ao .gitignore
- [ ] Testes locais funcionando
- [ ] Deploy em produção testado
- [ ] Monitoramento configurado
- [ ] Documentação atualizada

## 📞 Suporte

Em caso de problemas:
1. Verifique os logs das Edge Functions
2. Confirme se as variáveis estão configuradas
3. Teste localmente primeiro
4. Consulte a [documentação oficial](https://supabase.com/docs/guides/functions)

---

**Importante**: Nunca compartilhe service keys ou outros secrets em código, documentação ou comunicação. Sempre use variáveis de ambiente para informações sensíveis.