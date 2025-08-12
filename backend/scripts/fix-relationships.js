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

async function fixRelationships() {
  console.log('🔧 Corrigindo relacionamentos entre abrigados e instituições...');

  try {
    // Ler dados dos arquivos JSON
    const homelessPath = path.join(__dirname, '..', 'data', 'homeless.json');
    const homelessData = JSON.parse(fs.readFileSync(homelessPath, 'utf8'));

    console.log(`📊 Encontrados ${homelessData.length} abrigados para atualizar`);

    let updatedCount = 0;

    for (const homeless of homelessData) {
      try {
        console.log(`🔄 Atualizando ${homeless.name}...`);
        
        const { data, error } = await supabase
          .from('homeless')
          .update({
            institution_id: homeless.institutionId,
            institution_name: homeless.institutionName
          })
          .eq('id', homeless.id);

        if (error) {
          console.error(`❌ Erro ao atualizar ${homeless.name}:`, error);
        } else {
          console.log(`✅ ${homeless.name} atualizado - Instituição: ${homeless.institutionName}`);
          updatedCount++;
        }
      } catch (err) {
        console.error(`❌ Erro ao atualizar ${homeless.name}:`, err);
      }
    }

    // Verificar os dados atualizados
    const { data: homelessCount } = await supabase
      .from('homeless')
      .select('id, name, institution_id, institution_name');

    console.log('🎉 Atualização concluída!');
    console.log(`📈 Resultado: ${updatedCount}/${homelessData.length} abrigados atualizados`);
    
    if (homelessCount?.length > 0) {
      console.log('👥 Relacionamentos atualizados:');
      homelessCount.forEach(person => {
        console.log(`   - ${person.name} → ${person.institution_name} (ID: ${person.institution_id})`);
      });
    }

  } catch (error) {
    console.error('❌ Erro geral na atualização:', error);
  }
}

fixRelationships();