# Social Dev - Backend

Backend para o projeto Social Dev, desenvolvido com Node.js e Express.

## 🚀 Como executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. Navegue até a pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor:
```bash
npm start
```

Para desenvolvimento com auto-reload:
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3001`

## 📋 Endpoints Disponíveis

### Autenticação
- `POST /login` - Login de usuários (instituições e voluntários)

### Registro
- `POST /register/institution` - Cadastro de instituições
- `POST /abrigados/register` - Cadastro de abrigados

### Perfis (Requer autenticação)
- `GET /register/institution/profile` - Buscar perfil da instituição
- `PATCH /register/institution/profile` - Atualizar perfil da instituição
- `GET /abrigados/profile` - Buscar perfil do abrigado
- `PATCH /abrigados/profile` - Atualizar perfil do abrigado

### Moradores de Rua
- `GET /homeless` - Listar moradores de rua (público)
- `POST /homeless` - Cadastrar morador de rua (apenas instituições)

### Status
- `GET /status` - Status do servidor e estatísticas

## 🔐 Autenticação

O backend usa JWT (JSON Web Tokens) para autenticação. Após o login, inclua o token no header:

```
Authorization: Bearer <seu-token>
```

## 💾 Banco de Dados

Atualmente o backend usa armazenamento em memória para demonstração. Os dados são perdidos quando o servidor é reiniciado.

Para produção, recomenda-se integrar com um banco de dados real como PostgreSQL, MySQL ou MongoDB.

## 🛠 Tecnologias Utilizadas

- **Express.js** - Framework web
- **bcryptjs** - Criptografia de senhas
- **jsonwebtoken** - Autenticação JWT
- **cors** - Configuração de CORS
- **uuid** - Geração de IDs únicos