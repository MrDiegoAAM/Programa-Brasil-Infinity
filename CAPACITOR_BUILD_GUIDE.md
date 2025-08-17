# Guia de Build do Capacitor - APK Android

## Problemas Identificados e Soluções

### 1. Configuração Incorreta do webDir
**Problema:** O `capacitor.config.json` estava apontando para uma URL remota (`https://programa-brasil-infinity.vercel.app/home`) em vez de um diretório local.

**Solução:** Corrigido para apontar para o diretório de build local:
```json
{
  "appId": "com.infinityschool.programa.brasil",
  "appName": "Programa Brasil Infinity",
  "webDir": "Projeto - Cadastro Pessoas Carentes GoV/build",
  "server": {
    "androidScheme": "https"
  }
}
```

### 2. Conflito de Package Managers
**Problema:** O projeto tinha tanto `package-lock.json` (npm) quanto `yarn.lock` (yarn), causando conflitos.

**Recomendação:** Use apenas um gerenciador de pacotes. Para este projeto, recomendo usar npm:
```bash
# Remover yarn.lock se existir
rm yarn.lock
# Usar apenas npm
npm install
```

### 3. Dependências Não Atendidas
**Avisos identificados:**
- `@babel/plugin-syntax-flow@^7.14.5`
- `@babel/plugin-transform-react-jsx@^7.14.9`
- `react-is@>= 16.8.0`

**Solução:** Instalar as dependências em falta:
```bash
cd "Projeto - Cadastro Pessoas Carentes GoV"
npm install @babel/plugin-syntax-flow @babel/plugin-transform-react-jsx react-is
```

## Passos para Build do APK

### 1. Preparar o Ambiente
```bash
# Navegar para o diretório raiz
cd "c:\Users\diego\OneDrive\Infinity\Projeto - Cadastro Pessoas Carentes GoV"

# Instalar dependências do Capacitor (se necessário)
npm install
```

### 2. Build do React
```bash
# Navegar para o projeto React
cd "Projeto - Cadastro Pessoas Carentes GoV"

# Fazer o build de produção
npm run build
```

### 3. Sincronizar com Capacitor
```bash
# Voltar para o diretório raiz
cd ..

# Sincronizar arquivos
npx cap sync
```

### 4. Abrir no Android Studio
```bash
# Abrir o projeto Android no Android Studio
npx cap open android
```

### 5. Build do APK no Android Studio
1. No Android Studio, vá em `Build > Build Bundle(s) / APK(s) > Build APK(s)`
2. Aguarde o processo de build
3. O APK será gerado em `android/app/build/outputs/apk/debug/`

## Scripts Úteis

Os seguintes scripts foram adicionados ao `package.json` raiz:

```bash
# Build completo (React + Sync)
npm run cap:build:android

# Apenas build do React
npm run build

# Sincronizar com Capacitor
npm run cap:sync

# Abrir Android Studio
npm run cap:open:android
```

## Requisitos do Sistema

### Para Build Local:
- Node.js (versão 16 ou superior)
- Android Studio
- Java JDK 11 ou superior
- Android SDK

### Para Build no CI/CD (Ionic Appflow):
- Configuração correta do `capacitor.config.json`
- Variáveis de ambiente configuradas
- Certificados de assinatura (para release)

## Variáveis de Ambiente

Certifique-se de que todas as variáveis de ambiente estão configuradas:

```bash
# No arquivo .env do projeto React
REACT_APP_SUPABASE_URL=sua_url_supabase
REACT_APP_SUPABASE_ANON_KEY=sua_chave_anonima
REACT_APP_HOMELESS_BY_INSTITUTION_FUNCTION_URL=sua_url_funcao
```

## Troubleshooting

### Erro: "Unable to detect ionic project type"
- **Causa:** O projeto não é um projeto Ionic nativo
- **Solução:** Ignorar este aviso, é normal para projetos React + Capacitor

### Erro: "Detected both npm and yarn lockfiles"
- **Causa:** Conflito entre gerenciadores de pacotes
- **Solução:** Remover `yarn.lock` e usar apenas npm

### Erro: "webDir not found"
- **Causa:** Build do React não foi executado ou caminho incorreto
- **Solução:** Executar `npm run build` no projeto React

### APK não funciona em dispositivos
- **Causa:** Configuração de rede ou CORS
- **Solução:** Verificar se o backend Supabase aceita requisições do app mobile

## Próximos Passos

1. **Testar o APK:** Instalar em um dispositivo Android real
2. **Configurar Release:** Configurar assinatura para publicação na Play Store
3. **Otimizações Mobile:** Adicionar plugins específicos para mobile (câmera, localização, etc.)
4. **CI/CD:** Configurar build automático no Ionic Appflow ou GitHub Actions

## Suporte

Para mais informações, consulte:
- [Documentação do Capacitor](https://capacitorjs.com/docs)
- [Guia de Workflow](https://capacitorjs.com/docs/basics/workflow)
- [Ionic Appflow](https://ionic.io/docs/appflow)