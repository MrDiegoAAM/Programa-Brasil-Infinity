# Guia de Segurança - Chaves API

## ⚠️ IMPORTANTE: Segurança das Chaves API

### Chaves Públicas vs Secretas

#### ✅ Chaves Públicas (Seguras para Frontend)
- **ANON_KEY**: Pode ser exposta no frontend
- Tem permissões limitadas definidas pelas políticas RLS (Row Level Security)
- Usada para autenticação de usuários e operações básicas

#### ❌ Chaves Secretas (NUNCA expor no Frontend)
- **SERVICE_ROLE_KEY**: Tem acesso total ao banco de dados
- Bypassa todas as políticas de segurança RLS
- Deve ser usada APENAS em:
  - Scripts de desenvolvimento/teste (ambiente local)
  - Funções serverless (Edge Functions)
  - Backend/API privada

### Configuração Segura

#### Para a Aplicação React (.env)
```env
# ✅ Seguro - Chaves públicas
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key

# ❌ REMOVIDO - Chave secreta não deve estar aqui
# REACT_APP_SUPABASE_SERVICE_ROLE_KEY=...
```

#### Para Scripts de Desenvolvimento
Defina como variável de ambiente do sistema:

**Windows (PowerShell):**
```powershell
$env:SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

**Windows (CMD):**
```cmd
set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Linux/Mac:**
```bash
export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

### Verificação de Segurança

#### ✅ O que está seguro:
- Chaves ANON expostas no frontend
- Chaves SERVICE_ROLE em variáveis de ambiente do sistema
- Chaves SERVICE_ROLE em Edge Functions (Supabase)

#### ❌ O que NÃO é seguro:
- Chaves SERVICE_ROLE em arquivos .env do React
- Chaves SERVICE_ROLE commitadas no Git
- Chaves SERVICE_ROLE em código JavaScript do frontend

### Políticas de Segurança (RLS)

O projeto utiliza Row Level Security para garantir que:
- Usuários só acessem seus próprios dados
- Instituições só vejam seus abrigados
- Operações são validadas no nível do banco

### Em Caso de Exposição Acidental

1. **Regenerar imediatamente** as chaves no painel do Supabase
2. Atualizar todas as variáveis de ambiente
3. Verificar logs de acesso para atividades suspeitas
4. Revisar políticas RLS se necessário

### Auditoria de Segurança

Para verificar se há chaves expostas:
```bash
# Buscar por chaves service_role no código
grep -r "service_role" src/

# Verificar arquivos .env
grep -r "SERVICE_ROLE" .
```

---

**Lembre-se**: A segurança é responsabilidade de todos. Sempre revise o código antes de fazer commit e nunca exponha chaves secretas no frontend!