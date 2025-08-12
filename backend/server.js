const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const JSONDatabase = require('./data/database');
const { seedData } = require('./data/seedData');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'social-dev-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

// Inicializar banco de dados JSON
const db = new JSONDatabase();

// Função para inicializar dados se necessário
async function initializeData() {
  const institutions = db.getInstitutions();
  const homeless = db.getHomeless();
  
  if (institutions.length === 0 && homeless.length === 0) {
    console.log('🌱 Banco vazio, executando seed...');
    await seedData();
    // Recarregar dados após o seed
    db.reload();
  }
}

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  console.log('=== MIDDLEWARE AUTHENTICATE TOKEN ===');
  console.log('Headers recebidos:', req.headers);
  
  const authHeader = req.headers['authorization'];
  console.log('Auth header:', authHeader);
  
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Token extraído:', token);

  if (!token) {
    console.log('❌ Token não encontrado');
    return res.status(401).json({ message: 'Token de acesso requerido' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log('❌ Erro na verificação do token:', err.message);
      return res.status(403).json({ message: 'Token inválido' });
    }
    console.log('✅ Token válido, usuário:', user);
    req.user = user;
    next();
  });
};

// Rotas de autenticação
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Procurar usuário nas instituições
    let user = db.findInstitutionByEmail(email);
    let userType = 'institution';

    // Se não encontrou nas instituições, procurar nos abrigados
    if (!user) {
      user = db.findHomelessByEmail(email);
      userType = 'abrigado';
    }

    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

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
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rotas de registro
app.post('/register/institution', async (req, res) => {
  try {
    const { name, cnpj, address, telephone, email, password, picture } = req.body;

    // Verificar se já existe uma instituição com este email
    const existingInstitution = db.findInstitutionByEmail(email);
    if (existingInstitution) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar nova instituição
    const newInstitution = {
      id: uuidv4(),
      name,
      cnpj,
      address,
      telephone,
      email,
      password: hashedPassword,
      picture: picture || '',
      createdAt: new Date().toISOString()
    };

    // Salvar no banco JSON
    const saved = db.addInstitution(newInstitution);
    if (!saved) {
      return res.status(500).json({ message: 'Erro ao salvar instituição' });
    }

    res.status(201).json({
      message: 'Instituição cadastrada com sucesso',
      institution: {
        id: newInstitution.id,
        name: newInstitution.name,
        email: newInstitution.email
      }
    });
  } catch (error) {
    console.error('Erro no cadastro de instituição:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.post('/abrigados/register', async (req, res) => {
  try {
    const { name, email, password, telephone, address, picture, age, cpf, institutionId } = req.body;

    // Verificar se o abrigado já existe
    const existingAbrigado = db.findHomelessByEmail(email);
    if (existingAbrigado) {
      return res.status(400).json({
        success: false,
        message: 'Abrigado já cadastrado com este email'
      });
    }

    // Verificar se a instituição existe
    const institution = db.findInstitutionById(institutionId);
    if (!institution) {
      return res.status(400).json({
        success: false,
        message: 'Instituição não encontrada'
      });
    }

    // Criar novo abrigado
    const newAbrigado = {
      id: Date.now().toString(),
      name,
      email,
      password: await bcrypt.hash(password, 10),
      telephone,
      address,
      age: age || '',
      cpf: cpf || '',
      picture: picture || '',
      institutionId,
      institutionName: institution.name,
      hasLogin: true,
      createdAt: new Date().toISOString()
    };

    // Salvar no banco JSON
    const saved = db.addHomeless(newAbrigado);
    if (!saved) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao salvar abrigado'
      });
    }

    res.status(201).json({
      success: true,
      abrigado: {
        id: newAbrigado.id,
        name: newAbrigado.name,
        email: newAbrigado.email,
        institutionName: newAbrigado.institutionName
      }
    });

  } catch (error) {
    console.error('Erro no cadastro de abrigado:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Rotas de perfil
app.get('/register/institution/profile', authenticateToken, (req, res) => {
  console.log('🔍 Requisição para /register/institution/profile recebida');
  console.log('👤 Usuário autenticado:', req.user);
  
  try {
    if (req.user.type !== 'institution') {
      console.log('❌ Acesso negado - usuário não é instituição, tipo:', req.user.type);
      return res.status(403).json({ message: 'Acesso negado' });
    }

    console.log('🔍 Procurando instituição com ID:', req.user.id);
    
    const institution = db.findInstitutionById(req.user.id);
    if (!institution) {
      console.log('❌ Instituição não encontrada com ID:', req.user.id);
      return res.status(404).json({ message: 'Instituição não encontrada' });
    }

    console.log('✅ Instituição encontrada:', { id: institution.id, name: institution.name, email: institution.email });
    const { password, ...institutionData } = institution;
    console.log('📤 Enviando dados da instituição:', institutionData);
    res.status(200).json(institutionData);
  } catch (error) {
    console.error('Erro ao buscar perfil da instituição:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.get('/abrigados/profile', authenticateToken, (req, res) => {
  console.log('🔍 Requisição para /abrigados/profile recebida');
  console.log('👤 Usuário autenticado:', req.user);
  
  try {
    if (req.user.type !== 'abrigado') {
      console.log('❌ Acesso negado - usuário não é abrigado, tipo:', req.user.type);
      return res.status(403).json({ message: 'Acesso negado' });
    }

    console.log('🔍 Procurando abrigado com ID:', req.user.id);
    
    const abrigado = db.findHomelessById(req.user.id);
    if (!abrigado) {
      console.log('❌ Abrigado não encontrado com ID:', req.user.id);
      return res.status(404).json({ message: 'Abrigado não encontrado' });
    }

    console.log('✅ Abrigado encontrado:', { id: abrigado.id, name: abrigado.name, email: abrigado.email });
    const { password, ...abrigadoData } = abrigado;
    console.log('📤 Enviando dados do abrigado:', abrigadoData);
    res.status(200).json(abrigadoData);
  } catch (error) {
    console.error('Erro ao buscar perfil do abrigado:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.patch('/register/institution/profile', authenticateToken, (req, res) => {
  try {
    if (req.user.type !== 'institution') {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    const institution = db.findInstitutionById(req.user.id);
    if (!institution) {
      return res.status(404).json({ message: 'Instituição não encontrada' });
    }

    // Atualizar dados da instituição
    const updatedData = {
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    const updated = db.updateInstitution(req.user.id, updatedData);
    if (!updated) {
      return res.status(500).json({ message: 'Erro ao atualizar instituição' });
    }

    // Buscar dados atualizados
    const updatedInstitution = db.findInstitutionById(req.user.id);
    const { password, ...institutionData } = updatedInstitution;
    
    res.status(200).json({
      message: 'Perfil atualizado com sucesso',
      institution: institutionData
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil da instituição:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.patch('/abrigados/profile', authenticateToken, (req, res) => {
  console.log('🔄 PATCH /abrigados/profile - Iniciando atualização');
  console.log('👤 Usuário:', req.user);
  console.log('📝 Dados recebidos no body:', req.body);
  console.log('🖼️ Campo picture recebido:', req.body.picture);
  
  try {
    if (req.user.type !== 'abrigado') {
      console.log('❌ Acesso negado - tipo de usuário:', req.user.type);
      return res.status(403).json({ message: 'Acesso negado' });
    }

    const abrigado = db.findHomelessById(req.user.id);
    if (!abrigado) {
      console.log('❌ Abrigado não encontrado com ID:', req.user.id);
      return res.status(404).json({ message: 'Abrigado não encontrado' });
    }

    console.log('📋 Dados ANTES da atualização:', abrigado);

    // Atualizar dados do abrigado
    const updatedData = {
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    const updated = db.updateHomeless(req.user.id, updatedData);
    if (!updated) {
      console.log('❌ Erro ao salvar atualização');
      return res.status(500).json({ message: 'Erro ao atualizar abrigado' });
    }

    // Buscar dados atualizados
    const updatedHomeless = db.findHomelessById(req.user.id);
    console.log('📋 Dados DEPOIS da atualização:', updatedHomeless);
    console.log('🖼️ Campo picture após atualização:', updatedHomeless.picture);

    const { password, ...abrigadoData } = updatedHomeless;
    console.log('📤 Dados enviados na resposta:', abrigadoData);
    
    res.status(200).json({
      message: 'Perfil atualizado com sucesso',
      abrigado: abrigadoData
    });

  } catch (error) {
    console.error('Erro ao atualizar perfil do abrigado:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para listar instituições (para dropdown no cadastro de abrigados)
app.get('/institutions', (req, res) => {
  try {
    // Retornar apenas dados básicos das instituições (sem senha)
    const institutions = db.getInstitutions();
    const institutionsData = institutions.map(inst => ({
      id: inst.id,
      name: inst.name,
      address: inst.address
    }));
    
    res.status(200).json(institutionsData);
  } catch (error) {
    console.error('Erro ao buscar instituições:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Endpoint temporário para debug - listar todas as instituições com detalhes
app.get('/debug/institutions', (req, res) => {
  try {
    const institutions = db.getInstitutions();
    console.log('🔍 DEBUG - Total de instituições:', institutions.length);
    console.log('📋 Lista de instituições:');
    
    const institutionsData = institutions.map((inst, index) => {
      console.log(`${index + 1}. ${inst.name} (${inst.email}) - ID: ${inst.id}`);
      return {
        id: inst.id,
        name: inst.name,
        email: inst.email,
        cnpj: inst.cnpj,
        address: inst.address,
        telephone: inst.telephone,
        picture: inst.picture,
        createdAt: inst.createdAt
      };
    });
    
    res.status(200).json({
      total: institutions.length,
      institutions: institutionsData
    });
  } catch (error) {
    console.error('Erro ao buscar instituições:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para instituições visualizarem seus abrigados
app.get('/institutions/abrigados', authenticateToken, (req, res) => {
  try {
    if (req.user.type !== 'institution') {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    // Buscar abrigados vinculados à instituição
    const institutionAbrigados = db.findHomelessByInstitution(req.user.id)
      .map(abr => {
        const { password, ...abrigadoData } = abr;
        return abrigadoData;
      });

    res.status(200).json(institutionAbrigados);
  } catch (error) {
    console.error('Erro ao buscar abrigados da instituição:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para buscar abrigados (antigos moradores de rua) - visualização pública
app.get('/homeless', (req, res) => {
  try {
    // Retorna todos os abrigados, mas sem informações sensíveis como senha
    const homeless = db.getHomeless();
    const publicAbrigados = homeless.map(abrigado => {
      const { password, ...publicData } = abrigado;
      return publicData;
    });
    res.status(200).json(publicAbrigados);
  } catch (error) {
    console.error('Erro ao buscar abrigados:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.post('/homeless', authenticateToken, (req, res) => {
  try {
    // Verificar se é uma instituição
    if (req.user.type !== 'institution') {
      return res.status(403).json({ message: 'Apenas instituições podem cadastrar abrigados' });
    }

    // Buscar dados da instituição
    const institution = db.findInstitutionById(req.user.id);
    if (!institution) {
      return res.status(404).json({ message: 'Instituição não encontrada' });
    }

    const newAbrigado = {
      id: `abrigado-inst-${Date.now()}`,
      name: req.body.name,
      age: req.body.age || '',
      description: req.body.description || '',
      email: req.body.contact || req.body.email || '',
      telephone: req.body.telephone || '',
      address: req.body.address || req.body.institution || '',
      cpf: req.body.cpf || '',
      rg: req.body.rg || '',
      birthDate: req.body.birthDate || '',
      picture: req.body.picture || '',
      institutionId: institution.id,
      institutionName: institution.name,
      registeredBy: "institution",
      hasLogin: false,
      createdAt: new Date().toISOString()
    };

    // Salvar no banco JSON
    const saved = db.addHomeless(newAbrigado);
    if (!saved) {
      return res.status(500).json({ message: 'Erro ao salvar abrigado' });
    }

    res.status(201).json({
      message: 'Abrigado cadastrado com sucesso',
      abrigado: newAbrigado
    });
  } catch (error) {
    console.error('Erro ao cadastrar abrigado:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.put('/homeless/:id', authenticateToken, (req, res) => {
  try {
    if (req.user.type !== 'institution') {
      return res.status(403).json({ message: 'Apenas instituições podem atualizar abrigados' });
    }

    const abrigado = db.findHomelessById(req.params.id);
    if (!abrigado || abrigado.institutionId !== req.user.id) {
      return res.status(404).json({ message: 'Abrigado não encontrado ou não pertence à sua instituição' });
    }

    // Atualizar dados
    const updatedData = {
      ...abrigado,
      ...req.body,
      id: req.params.id, // Manter o ID original
      institutionId: req.user.id, // Manter a instituição original
      updatedAt: new Date().toISOString()
    };

    const updated = db.updateHomeless(req.params.id, updatedData);
    if (!updated) {
      return res.status(500).json({ message: 'Erro ao atualizar abrigado' });
    }

    res.status(200).json({
      message: 'Abrigado atualizado com sucesso',
      abrigado: updatedData
    });
  } catch (error) {
    console.error('Erro ao atualizar abrigado:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.delete('/homeless/:id', authenticateToken, (req, res) => {
  try {
    if (req.user.type !== 'institution') {
      return res.status(403).json({ message: 'Apenas instituições podem deletar abrigados' });
    }

    const abrigado = db.findHomelessById(req.params.id);
    if (!abrigado || abrigado.institutionId !== req.user.id) {
      return res.status(404).json({ message: 'Abrigado não encontrado ou não pertence à sua instituição' });
    }

    // Remover abrigado
    const deleted = db.deleteHomeless(req.params.id);
    if (!deleted) {
      return res.status(500).json({ message: 'Erro ao deletar abrigado' });
    }

    res.status(200).json({
      message: 'Abrigado removido com sucesso',
      abrigado: abrigado
    });
  } catch (error) {
    console.error('Erro ao deletar abrigado:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota de status
app.get('/status', (req, res) => {
  const institutions = db.getInstitutions();
  const homeless = db.getHomeless();
  const abrigadosComLogin = homeless.filter(a => a.hasLogin !== false).length;
  const abrigadosSemLogin = homeless.filter(a => a.hasLogin === false).length;
  
  res.status(200).json({
    message: 'Servidor Social Dev funcionando!',
    timestamp: new Date().toISOString(),
    stats: {
      institutions: institutions.length,
      abrigados: homeless.length,
      abrigadosComLogin: abrigadosComLogin,
      abrigadosSemLogin: abrigadosSemLogin
    }
  });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo deu errado!' });
});

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// Iniciar servidor
app.listen(PORT, async () => {
  await initializeData();
  
  const institutions = db.getInstitutions();
  const homeless = db.getHomeless();
  const abrigadosComLogin = homeless.filter(a => a.hasLogin !== false).length;
  const abrigadosSemLogin = homeless.filter(a => a.hasLogin === false).length;
  
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 Status: http://localhost:${PORT}/status`);
  console.log(`🏥 Instituições cadastradas: ${institutions.length}`);
  console.log(`👥 Total de abrigados: ${homeless.length}`);
  console.log(`🔐 Abrigados com login: ${abrigadosComLogin}`);
  console.log(`📝 Abrigados cadastrados por instituições: ${abrigadosSemLogin}`);
});