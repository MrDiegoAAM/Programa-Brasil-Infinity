import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('🔧 Testando conexão com Supabase...')
    const supabaseUrl = 'https://aadeajsyatbnkwasiqyj.supabase.co'
    const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhZGVhanN5YXRibmt3YXNpcXlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDk1NTgwMiwiZXhwIjoyMDcwNTMxODAyfQ.FRWSbNskDkMn_DiBTAdxrMeTjJI5jR-PwuW7txcdWCw'
    
    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey)

    // Testar busca de instituições
    console.log('🏥 Buscando todas as instituições...')
    const { data: institutions, error: instError } = await supabaseClient
      .from('institutions')
      .select('*')

    console.log('🏥 Resultado instituições:', { count: institutions?.length, error: instError })

    // Testar busca de abrigados
    console.log('👥 Buscando todos os abrigados...')
    const { data: homeless, error: homelessError } = await supabaseClient
      .from('homeless')
      .select('*')

    console.log('👥 Resultado abrigados:', { count: homeless?.length, error: homelessError })

    // Buscar especificamente o Diego
    console.log('🔍 Buscando Diego especificamente...')
    const { data: diego, error: diegoError } = await supabaseClient
      .from('homeless')
      .select('*')
      .eq('email', 'diegoaam@hotmail.com')
      .single()

    console.log('🔍 Resultado Diego:', { diego, diegoError })

    return new Response(
      JSON.stringify({
        message: 'Teste de conexão com banco',
        institutions: {
          count: institutions?.length || 0,
          error: instError?.message || null
        },
        homeless: {
          count: homeless?.length || 0,
          error: homelessError?.message || null
        },
        diego: {
          found: !!diego,
          name: diego?.name || null,
          error: diegoError?.message || null
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('❌ Erro no teste:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})