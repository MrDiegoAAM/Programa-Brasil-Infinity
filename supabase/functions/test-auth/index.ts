import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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
    if (req.method === 'POST') {
      const { email, password } = await req.json()
      
      console.log('📧 Teste de login para:', email)
      console.log('🔑 Senha recebida:', password)
      
      // Teste simples - se for o email e senha corretos, retorna sucesso
      if (email === 'diegoaam@hotmail.com' && password === '123456') {
        return new Response(
          JSON.stringify({
            success: true,
            message: 'Login de teste bem-sucedido!',
            user: {
              id: 'test-123',
              name: 'Diego Madeira',
              email: email,
              type: 'abrigado'
            }
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          },
        )
      } else {
        return new Response(
          JSON.stringify({ 
            success: false,
            error: 'Credenciais de teste inválidas',
            received: { email, password }
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 401,
          },
        )
      }
    }

    return new Response(
      JSON.stringify({ error: 'Método não permitido' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 405,
      },
    )
  } catch (error) {
    console.error('Erro na função de teste:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})