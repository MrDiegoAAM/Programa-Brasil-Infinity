require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variáveis de ambiente SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são obrigatórias');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkRLS() {
  console.log('🔍 Verificando configurações RLS...');

  try {
    // Verificar se conseguimos acessar as tabelas
    console.log('🏥 Testando acesso à tabela institutions...');
    const { data: institutions, error: instError } = await supabase
      .from('institutions')
      .select('*')
      .limit(1);

    if (instError) {
      console.error('❌ Erro ao acessar institutions:', instError);
    } else {
      console.log('✅ Acesso à tabela institutions OK:', institutions?.length || 0, 'registros');
    }

    console.log('👥 Testando acesso à tabela homeless...');
    const { data: homeless, error: homelessError } = await supabase
      .from('homeless')
      .select('*')
      .limit(1);

    if (homelessError) {
      console.error('❌ Erro ao acessar homeless:', homelessError);
    } else {
      console.log('✅ Acesso à tabela homeless OK:', homeless?.length || 0, 'registros');
    }

    // Buscar especificamente o Diego
    console.log('🔍 Buscando Diego...');
    const { data: diego, error: diegoError } = await supabase
      .from('homeless')
      .select('*')
      .eq('email', 'diegoaam@hotmail.com')
      .single();

    if (diegoError) {
      console.error('❌ Erro ao buscar Diego:', diegoError);
    } else {
      console.log('✅ Diego encontrado:', diego?.name);
      console.log('📧 Email:', diego?.email);
      console.log('🔐 Senha hash:', diego?.password?.substring(0, 20) + '...');
    }

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

checkRLS();