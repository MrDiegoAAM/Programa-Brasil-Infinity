<h1 align="center">
    <img alt="socialDevLogo" title="#socialDevLogo" src="./src/img/Logo.png" width="200px"/>
</h1>

## 🔭 Acesse o Deploy do Projeto Aqui: [Programa Brasil Infinity Brasil]()

## 💻 Sobre o projeto

Programa Brasil Infinity


### 🎯 **Problema Social**

Moradores de rua sofrem preconceito constante e são frequentemente marginalizados pela sociedade. Muitos possuem família, filhos e, por falta de oportunidades, acabam vivendo nas ruas. Essas pessoas se tornam "invisíveis" aos olhos da sociedade.

Quando alguém entra nessa situação, o retorno à vida anterior se torna extremamente difícil, pois encontrar trabalho sem uma residência fixa é um grande desafio.

### 🚀 **Nossa Missão**

**Dar visibilidade a essas pessoas**, gerando oportunidades de:
- 💼 **Emprego**
- 🏠 **Moradia** 
- 👨‍👩‍👧‍👦 **Reconexão familiar**
- 🤝 **Reintegração social**

### 🎯 **Objetivos do Sistema**

1. **Cadastrar pessoas em situação de rua** no sistema
2. **Disponibilizar suas histórias** para quem deseja ajudar
3. **Conectar habilidades e experiências** com oportunidades
4. **Facilitar o acesso** por localização geográfica
5. **Promover a busca** por pessoas "desaparecidas"
6. **Reconectar famílias** separadas pelas circunstâncias

### 📍 **Locais de Atuação**

O sistema atende pessoas que frequentam:
- 🏠 Abrigos comunitários
- 🍽️ Restaurantes populares do governo
- 💼 Postos de trabalho
- 🏥 Assistências sociais
- 📚 Centros de capacitação
- 🤝 ONGs e instituições parceiras

## ✨ **Funcionalidades Implementadas**

### 🔐 **Sistema de Autenticação**
- [x] **Login seguro** com JWT (JSON Web Tokens)
- [x] **Cadastro de instituições** (ONGs/Empresas com CNPJ)
- [x] **Cadastro de pessoas em situação de rua** (com CPF)
- [x] **Autenticação diferenciada** por tipo de usuário
- [x] **Proteção de rotas** privadas

### 👥 **Gestão de Usuários**
- [x] **Perfil completo de instituições** (Nome, CNPJ, endereço, telefone, email, foto)
- [x] **Perfil completo de pessoas abrigadas** (Nome, idade, CPF, telefone, email, foto)
- [x] **Edição de perfil** em tempo real
- [x] **Validação de dados** com feedback visual
- [x] **Upload de fotos** de perfil

### 🏠 **Cadastro de Pessoas em Situação de Rua**
- [x] **Cadastro por instituições** (pessoas sem login próprio)
- [x] **Auto-cadastro** (pessoas com login próprio)
- [x] **Informações detalhadas** (história, habilidades, localização)
- [x] **Vinculação com instituições** responsáveis
- [x] **Gestão de abrigados** por instituição

### 📊 **Dashboard e Relatórios**
- [x] **Dashboard institucional** com estatísticas
- [x] **Lista de abrigados** por instituição
- [x] **Formulário de cadastro** integrado
- [x] **Visualização pública** de pessoas cadastradas
- [x] **Sistema de busca** e filtros

### 🔧 **Funcionalidades Técnicas**
- [x] **API RESTful** completa
- [x] **Validação de dados** no frontend e backend
- [x] **Tratamento de erros** com notificações
- [x] **Interface responsiva** (mobile e desktop)
- [x] **Navegação protegida** por autenticação
- [x] **Sistema de notificações** (toast messages)

### 📱 **Interface do Usuário**
- [x] **Design moderno** e acessível
- [x] **Navegação intuitiva** com menu responsivo
- [x] **Formulários dinâmicos** com validação em tempo real
- [x] **Feedback visual** para ações do usuário
- [x] **Páginas informativas** sobre o projeto

### 🛡️ **Segurança**
- [x] **Criptografia de senhas** com bcrypt
- [x] **Tokens JWT** para autenticação
- [x] **Validação de CNPJ/CPF** 
- [x] **Proteção contra CORS**
- [x] **Sanitização de dados** de entrada


## 🎨 Layout

O layout da aplicação está disponível no Figma:

<a href="">
  <img alt="Made by patrickcordeiro" src="https://img.shields.io/badge/Acessar%20Layout%20-Figma-%2304D361">
</a>

### Mobile

<p align="center">
  <img alt="NuKenzie" title="#NuKenzie" src="./public/img/mobile-homepage.jpg" width="200px">

  <img alt="NuKenzie" title="#NuKenzie" src="./public/img/mobile-detalhes.jpg" width="200px">
</p>

### Web

<p align="center" style="display: flex; align-items: flex-start; justify-content: center;">
  <img alt="NuKenzie" title="#NuKenzie" src="./public/img/web-homepage.png" width="400px">

  <img alt="NuKenzie" title="#NuKenzie" src="./public/img/web-dashboard-start.png" width="400px">
  
  <img alt="NuKenzie" title="#NuKenzie" src="./public/img/web-dashboard-lancamentos.png" width="400px">
</p>

## 🛠 **Tecnologias Utilizadas**

### **Frontend**
- ⚛️ **React 18** - Biblioteca para interfaces de usuário
- 🔷 **TypeScript** - Superset do JavaScript com tipagem estática
- 🎨 **Styled Components** - CSS-in-JS para estilização
- 📋 **React Hook Form** - Gerenciamento de formulários
- ✅ **Yup** - Validação de esquemas
- 🚀 **React Router DOM** - Roteamento de páginas
- 🔔 **React Toastify** - Notificações toast
- 📱 **Design Responsivo** - Mobile-first approach

### **Backend**
- 🟢 **Node.js** - Runtime JavaScript
- ⚡ **Express.js** - Framework web minimalista
- 🔐 **JWT (jsonwebtoken)** - Autenticação via tokens
- 🔒 **bcryptjs** - Criptografia de senhas
- 🆔 **UUID** - Geração de identificadores únicos
- 🌐 **CORS** - Configuração de Cross-Origin Resource Sharing

### **Ferramentas de Desenvolvimento**
- 🎨 **Figma** - Design e prototipação
- 📝 **VSCode** - Editor de código
- 🔧 **Git** - Controle de versão
- 🐙 **GitHub** - Repositório e colaboração
- 📦 **npm/yarn** - Gerenciamento de pacotes

## 🚀 **Como Carregar e Executar o Programa**

### **📋 Pré-requisitos Obrigatórios**

Antes de começar, certifique-se de ter instalado em sua máquina:

| Ferramenta | Versão Mínima | Download | Verificação |
|------------|---------------|----------|-------------|
| **Node.js** | 14.0.0+ | [nodejs.org](https://nodejs.org/) | `node --version` |
| **npm** | 6.0.0+ | Incluído com Node.js | `npm --version` |
| **Git** | 2.0.0+ | [git-scm.com](https://git-scm.com) | `git --version` |

**Editores Recomendados:**
- 📝 [VSCode](https://code.visualstudio.com/) - Editor principal recomendado
- 🔧 [WebStorm](https://www.jetbrains.com/webstorm/) - IDE alternativa

### **⬇️ Passo 1: Baixar o Projeto**

```bash
# Opção 1: Clone via Git (recomendado)
git clone https://github.com/patrickcordeiroestudos/social-dev.git

# Opção 2: Download direto (se não tiver Git)
# Baixe o ZIP do GitHub e extraia

# Entre na pasta do projeto
cd social-dev
```

### **🔧 Passo 2: Configurar o Backend (Servidor)**

```bash
# 1. Navegue para a pasta do backend
cd backend

# 2. Instale as dependências do servidor
npm install

# 3. Verifique se a instalação foi bem-sucedida
npm list --depth=0

# 4. Inicie o servidor backend
node server.js

# ✅ Sucesso! Você verá uma mensagem como:
# "Servidor rodando na porta 3001"
# "Instituições registradas: X"
# "Pessoas abrigadas: X"
```

**🔍 Verificação do Backend:**
- Abra seu navegador e acesse: http://localhost:3001/status
- Você deve ver um JSON com informações do servidor

### **🖥️ Passo 3: Configurar o Frontend (Interface)**

**⚠️ IMPORTANTE:** Mantenha o backend rodando e abra um **novo terminal**

```bash
# 1. Volte para a pasta raiz do projeto (se estiver em /backend)
cd ..

# 2. Instale as dependências do frontend
npm install

# 3. Verifique se a instalação foi bem-sucedida
npm list --depth=0

# 4. Inicie a aplicação frontend
npm start

# ✅ Sucesso! O navegador abrirá automaticamente em:
# http://localhost:3000
```

### **🎯 Passo 4: Verificar se Tudo Está Funcionando**

1. **✅ Backend Ativo:** http://localhost:3001/status deve mostrar dados
2. **✅ Frontend Ativo:** http://localhost:3000 deve carregar a página inicial
3. **✅ Comunicação:** Teste fazer login ou cadastro na interface

### **🚨 Solução de Problemas Comuns**

#### **❌ Erro: "Port 3000 is already in use"**
```bash
# Pare outros processos na porta 3000
npx kill-port 3000
# Ou use uma porta diferente
PORT=3001 npm start
```

#### **❌ Erro: "Cannot find module"**
```bash
# Limpe o cache e reinstale
rm -rf node_modules package-lock.json
npm install
```

#### **❌ Erro: "ECONNREFUSED localhost:3001"**
```bash
# Verifique se o backend está rodando
cd backend
node server.js
```

#### **❌ Erro de permissão no Windows**
```bash
# Execute como administrador ou use:
npm install --no-optional
```

### **🔄 Comandos Úteis para Desenvolvimento**

```bash
# Parar os servidores
Ctrl + C (no terminal onde estão rodando)

# Reiniciar o backend
cd backend
node server.js

# Reiniciar o frontend
npm start

# Ver logs do servidor
cd backend
node server.js | tee server.log

# Verificar portas em uso
netstat -ano | findstr :3000
netstat -ano | findstr :3001
```

### **🔗 URLs de Acesso Completas**

| Serviço | URL | Descrição |
|---------|-----|-----------|
| **🖥️ Frontend** | http://localhost:3000 | Interface principal do usuário |
| **⚙️ Backend API** | http://localhost:3001 | Servidor de dados e autenticação |
| **📊 Status** | http://localhost:3001/status | Estatísticas do sistema |
| **🏠 Pessoas** | http://localhost:3001/homeless | Lista de pessoas cadastradas |
| **🔧 Debug** | http://localhost:3001/debug/institutions | Lista de instituições (dev) |

### **📱 Testando o Sistema**

1. **Acesse:** http://localhost:3000
2. **Cadastre uma instituição** usando o botão "Cadastrar"
3. **Faça login** com as credenciais criadas
4. **Teste o dashboard** cadastrando uma pessoa em situação de rua
5. **Verifique os dados** em http://localhost:3001/status

### **🎉 Pronto para Usar!**

Agora você tem o **Social Dev** rodando completamente em sua máquina! 

- 🖥️ **Interface:** http://localhost:3000
- ⚙️ **API:** http://localhost:3001

**💡 Dica:** Mantenha ambos os terminais abertos enquanto usa o sistema.

## 📡 **API Endpoints**

### **🔐 Autenticação**
- `POST /login` - Login de usuários (instituições e pessoas abrigadas)

### **📝 Cadastro**
- `POST /register/institution` - Cadastro de instituições
- `POST /abrigados/register` - Cadastro de pessoas em situação de rua

### **👤 Perfis (Requer autenticação)**
- `GET /register/institution/profile` - Buscar perfil da instituição
- `PATCH /register/institution/profile` - Atualizar perfil da instituição
- `GET /abrigados/profile` - Buscar perfil da pessoa abrigada
- `PATCH /abrigados/profile` - Atualizar perfil da pessoa abrigada

### **🏠 Gestão de Pessoas em Situação de Rua**
- `GET /homeless` - Listar pessoas cadastradas (público)
- `POST /homeless` - Cadastrar pessoa (apenas instituições)
- `PUT /homeless/:id` - Atualizar dados da pessoa (apenas instituições)
- `DELETE /homeless/:id` - Remover pessoa (apenas instituições)

### **📊 Relatórios e Estatísticas**
- `GET /status` - Status do servidor e estatísticas gerais
- `GET /institutions/abrigados` - Listar abrigados da instituição (autenticado)

### **🔧 Debug (Desenvolvimento)**
- `GET /debug/institutions` - Listar todas as instituições cadastradas

## 💾 **Banco de Dados**

Atualmente o sistema utiliza **armazenamento em memória** para demonstração. Os dados incluem:

### **📊 Estatísticas Atuais**
- **2 instituições** cadastradas
- **4 pessoas** em situação de rua cadastradas
- **2 pessoas** com login próprio
- **2 pessoas** cadastradas por instituições

### **🔄 Para Produção**
Para ambiente de produção, recomenda-se integrar com:
- 🐘 **PostgreSQL** - Banco relacional robusto
- 🍃 **MongoDB** - Banco NoSQL flexível
- 🔥 **Firebase** - Banco em tempo real
- ☁️ **AWS RDS** - Banco gerenciado na nuvem

## 🔒 **Segurança e Boas Práticas**

### **🛡️ Implementações de Segurança**
- ✅ **Autenticação JWT** - Tokens seguros para sessões
- ✅ **Criptografia de Senhas** - bcryptjs para hash de senhas
- ✅ **Validação de Dados** - Yup para validação no frontend
- ✅ **CORS Configurado** - Controle de acesso entre domínios
- ✅ **Sanitização de Inputs** - Prevenção de ataques XSS

### **⚠️ Considerações para Produção**
- 🔐 Implementar HTTPS obrigatório
- 🔑 Usar variáveis de ambiente para secrets
- 📊 Implementar logs de auditoria
- 🚫 Rate limiting para APIs
- 🔍 Monitoramento de segurança

## 🚀 **Próximos Passos e Melhorias**

### **📈 Funcionalidades Planejadas**
- 📧 **Sistema de Notificações** - Email e SMS
- 📊 **Dashboard Avançado** - Gráficos e relatórios
- 🗺️ **Mapa Interativo** - Localização de instituições
- 📱 **App Mobile** - React Native
- 🤖 **Chatbot** - Assistente virtual
- 🌐 **Multilíngue** - Suporte a múltiplos idiomas

### **🔧 Melhorias Técnicas**
- 💾 **Banco de Dados Persistente** - PostgreSQL/MongoDB
- ☁️ **Deploy na Nuvem** - AWS/Vercel/Heroku
- 🧪 **Testes Automatizados** - Jest/Cypress
- 📦 **CI/CD Pipeline** - GitHub Actions
- 🐳 **Containerização** - Docker

## 😯 **Como Contribuir para o Projeto**

### **🤝 Formas de Contribuir**
1. 🐛 **Reportar Bugs** - Abra uma issue detalhada
2. 💡 **Sugerir Funcionalidades** - Compartilhe suas ideias
3. 📝 **Melhorar Documentação** - Ajude outros desenvolvedores
4. 🔧 **Contribuir com Código** - Siga o processo abaixo



### **📏 Padrões de Código**
- 📝 **Commits Semânticos** - feat, fix, docs, style, refactor
- 🧹 **ESLint/Prettier** - Formatação consistente
- 📚 **Documentação** - Comente código complexo
- 🧪 **Testes** - Cubra novas funcionalidades

## 📝 **Licença**

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.