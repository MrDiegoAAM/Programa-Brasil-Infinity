# 🧹 Plano de Limpeza do Projeto

## 📊 Análise Atual
- **Tamanho Total**: 995,39 MB
- **Arquivos**: 47.264
- **Principal problema**: node_modules (959,96 MB - 96% do espaço)

## 🗂️ Distribuição por Pasta
| Pasta | Tamanho (MB) | % do Total |
|-------|-------------|------------|
| node_modules | 959,96 | 96,4% |
| backend | 24,56 | 2,5% |
| src | 8,28 | 0,8% |
| public | 0,56 | 0,1% |
| supabase | 0,03 | 0,003% |

## 🎯 Arquivos/Pastas para Remover

### ✅ SEGURO PARA REMOVER (Backend não é mais necessário)
1. **`backend/node_modules/`** - 24,41 MB
2. **`backend/server.js`** - Servidor local antigo
3. **`backend/server-supabase.js`** - Não é mais necessário
4. **`backend/package.json`** - Dependências do backend local
5. **`backend/package-lock.json`** - Lock file do backend
6. **`backend/migrate.bat`** - Script de migração já executado
7. **`backend/start-supabase.bat`** - Não é mais necessário
8. **`backend/scripts/`** - Scripts de migração já executados
9. **`backend/sql/`** - Arquivos SQL já aplicados
10. **`backend/models/`** - Modelos do backend local
11. **`backend/seeders/`** - Seeders já executados
12. **`backend/data/database.js`** - Database local antigo

### ⚠️ MANTER (Ainda úteis)
- **`backend/data/homeless.json`** - Dados de referência
- **`backend/data/institutions.json`** - Dados de referência
- **`backend/config/supabase.js`** - Configuração de referência
- **`backend/README-SUPABASE.md`** - Documentação

### 🔄 OTIMIZAR
1. **Reinstalar node_modules** - Limpar cache e dependências desnecessárias
2. **Remover arquivos temporários**
3. **Limpar cache do npm**

## 📈 Economia Estimada
- **Backend completo**: ~24 MB
- **Reinstalação node_modules**: ~200-300 MB (economia de cache)
- **Total estimado**: ~300-400 MB de economia
- **Tamanho final esperado**: ~600-700 MB

## 🚀 Benefícios da Limpeza
1. **Menor tamanho**: Mais fácil de fazer backup
2. **Menos confusão**: Sem arquivos duplicados/desnecessários
3. **Melhor performance**: Menos arquivos para indexar
4. **Clareza**: Foco apenas no frontend e Supabase