const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const SupabaseDatabase = require('./data/supabaseDatabase');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'social-dev-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

// Inicializar database
const db = new SupabaseDatabase();

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token de acesso requerido' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// Rota de status
app.get('/status', async (req, res) => {
  try {
    const institutions = await db.getInstitutions();
    const homeless = await db.getHomeless();
    
    const homelessWithLogin = homeless.filter(person => person.has_login);
    const homelessByInstitution = homeless.filter(person => person.registered_by === 'institution');

    res.json({
      status: 'online',
      database: 'Supabase',
      timestamp: new Date().toISOString(),
      data: {
        institutions: institutions.length,
        homeless: homeless.length,
        homelessWithLogin: homelessWithLogin.length,
        homelessByInstitution: homelessByInstitution.length
      }
    });
  } catch (error) {
    console.error('Erro ao obter status:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rotas de autenticação
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Procurar usuário nas instituições
    let user = await db.findInstitutionByEmail(email);
    let userType = 'institution';

    // Se não encontrou nas instituições, procurar nos abrigados
    if (!user) {
      user = await db.findHomelessByEmail(email);
      userType = 'abrigado';
    }

    if (!user) {
      console.log('❌ Usuário não encontrado:', email);
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log('❌ Senha incorreta para:', email);
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    console.log('✅ Login realizado com sucesso:', email);

    // Gerar token
    const token = jwt.sign(
      { id: user.id, email: user.email, type: userType },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      token: {
        token: token,
        type: userType
      },
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: userType
      }
    });
  } catch (error) {
    console.error('❌ Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para cadastro de instituições
app.post('/register/institution', async (req, res) => {
  try {
    const { name, cnpj, address, telephone, email, password, picture } = req.body;

    // Verificar se email já existe
    const existingInstitution = await db.findInstitutionByEmail(email);
    if (existingInstitution) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10);

    const newInstitution = {
      id: `inst-${uuidv4()}`,
      name,
      cnpj,
      address,
      telephone,
      email,
      password: hashedPassword,
      picture: picture || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const success = await db.addInstitution(newInstitution);
    if (success) {
      console.log('✅ Instituição cadastrada:', name);
      res.status(201).json({ message: 'Instituição cadastrada com sucesso' });
    } else {
      res.status(500).json({ message: 'Erro ao cadastrar instituição' });
    }
  } catch (error) {
    console.error('❌ Erro ao cadastrar instituição:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para cadastro de abrigados
app.post('/register/homeless', async (req, res) => {
  try {
    const { name, email, password, telephone, address, age, cpf, rg, birthDate, picture, description, institutionId } = req.body;

    // Verificar se email já existe
    if (email) {
      const existingHomeless = await db.findHomelessByEmail(email);
      if (existingHomeless) {
        return res.status(400).json({ message: 'Abrigado já cadastrado com este email' });
      }
    }

    // Buscar informações da instituição se institutionId foi fornecido
    let institutionName = null;
    if (institutionId) {
      const institution = await db.findInstitutionById(institutionId);
      if (institution) {
        institutionName = institution.name;
      }
    }

    // Criptografar senha se fornecida
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const newHomeless = {
      id: Date.now().toString(),
      name,
      email: email || null,
      password: hashedPassword,
      telephone,
      address,
      age,
      cpf,
      rg,
      birth_date: birthDate,
      picture: picture || '',
      institution_id: institutionId || null,
      institution_name: institutionName,
      registered_by: 'self',
      has_login: !!password,
      description: description || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const success = await db.addHomeless(newHomeless);
    if (success) {
      console.log('✅ Abrigado cadastrado:', name);
      res.status(201).json({ message: 'Abrigado cadastrado com sucesso' });
    } else {
      res.status(500).json({ message: 'Erro ao cadastrar abrigado' });
    }
  } catch (error) {
    console.error('❌ Erro ao cadastrar abrigado:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rotas de perfil
app.get('/register/institution/profile', authenticateToken, async (req, res) => {
  try {
    if (req.user.type !== 'institution') {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    const institution = await db.findInstitutionById(req.user.id);
    if (!institution) {
      return res.status(404).json({ message: 'Instituição não encontrada' });
    }

    const { password, ...institutionData } = institution;
    res.status(200).json(institutionData);
  } catch (error) {
    console.error('Erro ao buscar perfil da instituição:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.get('/abrigados/profile', authenticateToken, async (req, res) => {
  try {
    if (req.user.type !== 'abrigado') {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    const abrigado = await db.findHomelessById(req.user.id);
    if (!abrigado) {
      return res.status(404).json({ message: 'Abrigado não encontrado' });
    }

    const { password, ...abrigadoData } = abrigado;
    res.status(200).json(abrigadoData);
  } catch (error) {
    console.error('Erro ao buscar perfil do abrigado:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rotas para atualizar perfis
app.patch('/profile-institution', authenticateToken, async (req, res) => {
  try {
    if (req.user.type !== 'institution') {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    const updatedData = {
      ...req.body,
      updated_at: new Date().toISOString()
    };

    // Não permitir alteração de campos sensíveis
    delete updatedData.id;
    delete updatedData.password;
    delete updatedData.created_at;

    const success = await db.updateInstitution(req.user.id, updatedData);
    if (success) {
      const institution = await db.findInstitutionById(req.user.id);
      const { password, ...institutionData } = institution;
      res.status(200).json({ 
        message: 'Perfil atualizado com sucesso',
        institution: institutionData 
      });
    } else {
      res.status(500).json({ message: 'Erro ao atualizar perfil' });
    }
  } catch (error) {
    console.error('❌ Erro ao atualizar perfil da instituição:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.patch('/profile-homeless', authenticateToken, async (req, res) => {
  try {
    if (req.user.type !== 'abrigado') {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    const updatedData = {
      ...req.body,
      updated_at: new Date().toISOString()
    };

    // Não permitir alteração de campos sensíveis
    delete updatedData.id;
    delete updatedData.password;
    delete updatedData.created_at;

    const success = await db.updateHomeless(req.user.id, updatedData);
    if (success) {
      const abrigado = await db.findHomelessById(req.user.id);
      const { password, ...abrigadoData } = abrigado;
      res.status(200).json({ 
        message: 'Perfil atualizado com sucesso',
        abrigado: abrigadoData 
      });
    } else {
      res.status(500).json({ message: 'Erro ao atualizar perfil' });
    }
  } catch (error) {
    console.error('❌ Erro ao atualizar perfil do abrigado:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para listar instituições
app.get('/institutions', async (req, res) => {
  try {
    const institutions = await db.getInstitutions();
    const institutionsData = institutions.map(({ password, ...inst }) => inst);
    res.status(200).json(institutionsData);
  } catch (error) {
    console.error('Erro ao buscar instituições:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para cadastrar abrigado por instituição
app.post('/register/homeless/by-institution', authenticateToken, async (req, res) => {
  try {
    if (req.user.type !== 'institution') {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    const institution = await db.findInstitutionById(req.user.id);
    if (!institution) {
      return res.status(404).json({ message: 'Instituição não encontrada' });
    }

    const newHomeless = {
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email || null,
      password: null,
      telephone: req.body.telephone || '',
      address: req.body.address || req.body.institution || '',
      age: req.body.age || '',
      cpf: req.body.cpf || '',
      rg: req.body.rg || '',
      birth_date: req.body.birthDate || '',
      picture: req.body.picture || '',
      institution_id: institution.id,
      institution_name: institution.name,
      registered_by: "institution",
      has_login: false,
      description: req.body.description || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const success = await db.addHomeless(newHomeless);
    if (success) {
      console.log('✅ Abrigado cadastrado pela instituição:', newHomeless.name);
      res.status(201).json({ 
        message: 'Abrigado cadastrado com sucesso',
        homeless: newHomeless
      });
    } else {
      res.status(500).json({ message: 'Erro ao cadastrar abrigado' });
    }
  } catch (error) {
    console.error('❌ Erro ao cadastrar abrigado:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para listar abrigados de uma instituição
app.get('/homeless/by-institution', authenticateToken, async (req, res) => {
  try {
    if (req.user.type !== 'institution') {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    const homeless = await db.findHomelessByInstitution(req.user.id);
    res.status(200).json(homeless);
  } catch (error) {
    console.error('Erro ao buscar abrigados da instituição:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para buscar abrigados (visualização pública)
app.get('/homeless', async (req, res) => {
  try {
    const homeless = await db.getHomeless();
    // Retorna todos os abrigados, mas sem informações sensíveis como senha
    const publicHomeless = homeless.map(person => {
      const { password, ...publicData } = person;
      return publicData;
    });
    res.status(200).json(publicHomeless);
  } catch (error) {
    console.error('Erro ao buscar abrigados:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para atualizar abrigado
app.put('/homeless/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.type !== 'institution') {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    const homelessId = req.params.id;
    const updatedData = {
      ...req.body,
      updated_at: new Date().toISOString()
    };

    // Não permitir alteração de campos sensíveis
    delete updatedData.id;
    delete updatedData.password;
    delete updatedData.created_at;

    const success = await db.updateHomeless(homelessId, updatedData);
    if (success) {
      const homeless = await db.findHomelessById(homelessId);
      res.status(200).json({ 
        message: 'Abrigado atualizado com sucesso',
        homeless: homeless
      });
    } else {
      res.status(500).json({ message: 'Erro ao atualizar abrigado' });
    }
  } catch (error) {
    console.error('❌ Erro ao atualizar abrigado:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor Supabase rodando na porta ${PORT}`);
  console.log(`🌐 Database: Supabase Cloud`);
  console.log(`📊 Status: http://localhost:${PORT}/status`);
  console.log(`🔗 Supabase URL: ${process.env.SUPABASE_URL}`);
});