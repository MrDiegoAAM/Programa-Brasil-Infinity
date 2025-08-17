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
    console.log('🔧 Auth sem bcrypt iniciado...')
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing required environment variables: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
}

const supabaseClient = createClient(supabaseUrl, supabaseServiceKey)

    if (req.method === 'POST') {
      const { email, password } = await req.json()
      console.log('📧 Email:', email)
      console.log('🔐 Password:', password ? 'fornecida' : 'não fornecida')

      if (!email || !password) {
        return new Response(
          JSON.stringify({ error: 'Email e senha são obrigatórios' }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          },
        )
      }

      // Buscar usuário homeless
      console.log('🔍 Buscando homeless...')
      const { data: homeless, error: homelessError } = await supabaseClient
        .from('homeless')
        .select('*')
        .eq('email', email)
        .single()

      console.log('👥 Homeless encontrado:', homeless ? homeless.name : 'não encontrado')
      console.log('❌ Erro homeless:', homelessError?.message || 'nenhum')

      if (homeless && !homelessError) {
        console.log('🔐 Hash no banco:', homeless.password)
        console.log('🔐 Senha fornecida:', password)
        
        // Para teste, vamos verificar se a senha é "123456" (sem hash)
        if (password === '123456') {
          console.log('✅ Senha de teste aceita!')
          return new Response(
            JSON.stringify({
              success: true,
              message: 'Login realizado com sucesso (teste sem bcrypt)!',
              user: {
                id: homeless.id,
                name: homeless.name,
                email: homeless.email,
                type: 'homeless'
              }
            }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 200,
            },
          )
        } else {
          console.log('❌ Senha de teste incorreta')
          return new Response(
            JSON.stringify({ 
              error: 'Senha inválida (teste)',
              debug: {
                expected: '123456',
                received: password
              }
            }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 401,
            },
          )
        }
      }

      return new Response(
        JSON.stringify({ error: 'Usuário não encontrado' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404,
        },
      )
    }

    return new Response(
      JSON.stringify({ error: 'Método não permitido' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 405,
      },
    )
  } catch (error) {
    console.error('❌ Erro na autenticação:', error)
    return new Response(
      JSON.stringify({ 
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