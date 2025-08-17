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
    console.log('🔧 Teste básico iniciado...')
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing required environment variables: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    }
    
    console.log('✅ Configurações carregadas')
    
    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey)
    console.log('✅ Cliente Supabase criado')

    if (req.method === 'POST') {
      const { email } = await req.json()
      console.log('📧 Email recebido:', email)

      // Teste simples de busca
      console.log('🔍 Testando busca na tabela homeless...')
      const { data, error } = await supabaseClient
        .from('homeless')
        .select('id, name, email')
        .eq('email', email)
        .single()

      console.log('📊 Resultado:', { data, error })

      if (error) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: error.message,
            details: error 
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          },
        )
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Busca realizada com sucesso!',
          user: data
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Função test-basic funcionando!',
        method: req.method 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('❌ Erro:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        stack: error.stack 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})