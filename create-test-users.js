const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceKey = process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variáveis de ambiente SUPABASE_URL e SERVICE_ROLE_KEY são obrigatórias');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Usuários de teste das credenciais
const testUsers = [
  // Instituições
  {
    email: 'contato@ajudeme.org',
    password: '123456',
    type: 'institution',
    metadata: {
      name: 'AjudeMe',
      cnpj: '12.345.678/0001-90',
      telephone: '(81) 3333-4444'
    }
  },
  {
    email: 'ajuda@infinityschool.com',
    password: '123456',
    type: 'institution',
    metadata: {
      name: 'Fundação Infinity School',
      cnpj: '98.765.432/0001-10',
      telephone: '(11) 9999-8888'
    }
  },
  // Pessoas carentes
  {
    email: 'haroldo@gmail.com',
    password: '123456',
    type: 'homeless',
    metadata: {
      name: 'Haroldo Silva',
      cpf: '123.456.789-00',
      telephone: '(81) 99999-9999'
    }
  },
  {
    email: 'antonio@gmail.com',
    password: '123456',
    type: 'homeless',
    metadata: {
      name: 'Antonio Santos',
      cpf: '987.654.321-00',
      telephone: '(81) 98888-7777'
    }
  },
  {
    email: 'diegoaam@hotmail.com',
    password: '123456',
    type: 'homeless',
    metadata: {
      name: 'Diego Madeira',
      cpf: '05045194410',
      telephone: '81997552530'
    }
  }
];

async function createTestUsers() {
  console.log('🚀 Criando usuários de teste no Supabase Auth...');
  
  for (const user of testUsers) {
    try {
      console.log(`\n📧 Criando usuário: ${user.email}`);
      
      const { data, error } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true, // Confirma o email automaticamente
        user_metadata: {
          ...user.metadata,
          user_type: user.type
        }
      });
      
      if (error) {
        if (error.message.includes('already registered')) {
          console.log(`⚠️  Usuário ${user.email} já existe`);
        } else {
          console.error(`❌ Erro ao criar ${user.email}:`, error.message);
        }
      } else {
        console.log(`✅ Usuário ${user.email} criado com sucesso!`);
        console.log(`   ID: ${data.user.id}`);
        console.log(`   Tipo: ${user.type}`);
      }
    } catch (err) {
      console.error(`❌ Erro inesperado ao criar ${user.email}:`, err.message);
    }
  }
  
  console.log('\n🎉 Processo de criação de usuários concluído!');
  console.log('\n📋 Credenciais de teste:');
  console.log('Email: qualquer um dos emails acima');
  console.log('Senha: 123456');
}

createTestUsers().catch(console.error);