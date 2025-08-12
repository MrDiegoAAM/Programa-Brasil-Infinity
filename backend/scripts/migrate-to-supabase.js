require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variáveis de ambiente SUPABASE_URL e SUPABASE_ANON_KEY são obrigatórias');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  console.log('🧪 Testando inserção de dados...');
  
  // Testar inserção em institutions
  try {
    const { data, error } = await supabase
      .from('institutions')
      .insert([{
        id: 'test-inst-123',
        name: 'Teste Institution',
        cnpj: '99.999.999/0001-99',
        address: 'Rua Teste, 123',
        telephone: '(11) 99999-9999',
        email: 'teste@teste.com',
        password: 'hashedpassword',
        picture: ''
      }]);

    if (error) {
      console.error('❌ Erro no teste de inserção institutions:', error);
      return false;
    } else {
      console.log('✅ Teste de inserção institutions bem-sucedido');
      
      // Remover o registro de teste
      await supabase.from('institutions').delete().eq('id', 'test-inst-123');
      return true;
    }
  } catch (err) {
    console.error('❌ Erro no teste de inserção institutions:', err);
    return false;
  }
}

async function migrateData() {
  console.log('🚀 Iniciando migração para Supabase...');

  // Primeiro, testar se conseguimos inserir dados
  const canInsert = await testInsert();
  if (!canInsert) {
    console.error('❌ Não foi possível inserir dados de teste. Verifique as permissões.');
    return;
  }

  try {
    // Ler dados dos arquivos JSON
    const institutionsPath = path.join(__dirname, '..', 'data', 'institutions.json');
    const homelessPath = path.join(__dirname, '..', 'data', 'homeless.json');

    const institutionsData = JSON.parse(fs.readFileSync(institutionsPath, 'utf8'));
    const homelessData = JSON.parse(fs.readFileSync(homelessPath, 'utf8'));

    console.log(`📊 Encontrados ${institutionsData.length} instituições e ${homelessData.length} abrigados`);

    // Migrar instituições uma por vez
    console.log('🏥 Migrando instituições...');
    let institutionsSuccess = 0;
    
    for (const institution of institutionsData) {
      try {
        // Primeiro, verificar se já existe
        const { data: existing } = await supabase
          .from('institutions')
          .select('id')
          .eq('id', institution.id)
          .single();

        if (existing) {
          console.log(`⚠️  Instituição ${institution.name} já existe, pulando...`);
          institutionsSuccess++;
          continue;
        }

        const { data, error } = await supabase
          .from('institutions')
          .insert([{
            id: institution.id,
            name: institution.name,
            cnpj: institution.cnpj,
            address: institution.address,
            telephone: institution.telephone,
            email: institution.email,
            password: institution.password,
            picture: institution.picture || '',
            created_at: institution.created_at || new Date().toISOString(),
            updated_at: institution.updated_at || new Date().toISOString()
          }]);

        if (error) {
          console.error(`❌ Erro ao migrar instituição ${institution.name}:`, error);
        } else {
          console.log(`✅ Instituição ${institution.name} migrada com sucesso`);
          institutionsSuccess++;
        }
      } catch (err) {
        console.error(`❌ Erro ao migrar instituição ${institution.name}:`, err);
      }
    }

    // Migrar abrigados uma por vez
    console.log('👥 Migrando abrigados...');
    let homelessSuccess = 0;
    
    for (const homeless of homelessData) {
      try {
        // Primeiro, verificar se já existe
        const { data: existing } = await supabase
          .from('homeless')
          .select('id')
          .eq('id', homeless.id)
          .single();

        if (existing) {
          console.log(`⚠️  Abrigado ${homeless.name} já existe, pulando...`);
          homelessSuccess++;
          continue;
        }

        const { data, error } = await supabase
          .from('homeless')
          .insert([{
            id: homeless.id,
            name: homeless.name,
            email: homeless.email,
            password: homeless.password,
            telephone: homeless.telephone,
            address: homeless.address,
            age: homeless.age,
            cpf: homeless.cpf,
            rg: homeless.rg,
            birth_date: homeless.birthDate || homeless.birth_date,
            picture: homeless.picture || '',
            institution_id: homeless.institutionId,
            institution_name: homeless.institutionName,
            registered_by: homeless.registered_by || 'self',
            has_login: homeless.has_login || false,
            description: homeless.description || '',
            created_at: homeless.created_at || new Date().toISOString(),
            updated_at: homeless.updated_at || new Date().toISOString()
          }]);

        if (error) {
          console.error(`❌ Erro ao migrar abrigado ${homeless.name}:`, error);
        } else {
          console.log(`✅ Abrigado ${homeless.name} migrado com sucesso`);
          homelessSuccess++;
        }
      } catch (err) {
        console.error(`❌ Erro ao migrar abrigado ${homeless.name}:`, err);
      }
    }

    // Verificar dados migrados
    const { data: institutionsCount } = await supabase
      .from('institutions')
      .select('*');

    const { data: homelessCount } = await supabase
      .from('homeless')
      .select('*');

    console.log('🎉 Migração concluída!');
    console.log('📈 Resultado da migração:');
    console.log(`   - Instituições migradas: ${institutionsSuccess}/${institutionsData.length}`);
    console.log(`   - Abrigados migrados: ${homelessSuccess}/${homelessData.length}`);
    console.log(`   - Total no Supabase: ${institutionsCount?.length || 0} instituições, ${homelessCount?.length || 0} abrigados`);

    if (institutionsCount?.length > 0) {
      console.log('🏥 Instituições no Supabase:');
      institutionsCount.forEach(inst => {
        console.log(`   - ${inst.name} (${inst.email})`);
      });
    }

    if (homelessCount?.length > 0) {
      console.log('👥 Abrigados no Supabase:');
      homelessCount.forEach(person => {
        console.log(`   - ${person.name} (${person.email || 'sem email'})`);
      });
    }

  } catch (error) {
    console.error('❌ Erro geral na migração:', error);
  }
}

migrateData();