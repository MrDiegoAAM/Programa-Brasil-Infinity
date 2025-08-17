import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing required environment variables: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verificar autorização
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('❌ Missing authorization header');
      return new Response(
        JSON.stringify({ message: 'Missing authorization header' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    console.log('🔑 Token recebido:', token.substring(0, 20) + '...');

    // Verificar e decodificar o JWT
    const JWT_SECRET = Deno.env.get('JWT_SECRET') || 'social-dev-secret-key';
    
    let decoded;
    try {
      // Importar dinamicamente a biblioteca JWT
      const { verify } = await import("https://deno.land/x/djwt@v2.8/mod.ts");
      const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(JWT_SECRET),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign", "verify"]
      );
      decoded = await verify(token, key);
      console.log('✅ Token decodificado:', decoded);
    } catch (error) {
      console.log('❌ Erro ao verificar token:', error);
      return new Response(
        JSON.stringify({ message: 'Token inválido' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Verificar se é uma instituição
    if (decoded.type !== 'institution') {
      console.log('❌ Acesso negado - usuário não é instituição, tipo:', decoded.type);
      return new Response(
        JSON.stringify({ message: 'Acesso negado' }),
        { 
          status: 403, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (req.method === 'GET') {
      // Buscar perfil da instituição
      console.log('🔍 Procurando instituição com ID:', decoded.id);
      
      const { data: institution, error } = await supabase
        .from('institutions')
        .select('*')
        .eq('id', decoded.id)
        .single();

      if (error) {
        console.error('❌ Erro ao buscar instituição:', error);
        return new Response(
          JSON.stringify({ message: 'Erro ao buscar perfil' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      if (!institution) {
        console.log('❌ Instituição não encontrada');
        return new Response(
          JSON.stringify({ message: 'Instituição não encontrada' }),
          { 
            status: 404, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      // Remover senha da resposta
      const { password, ...institutionData } = institution;
      console.log('✅ Perfil da instituição encontrado:', institutionData);
      
      return new Response(
        JSON.stringify(institutionData),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Método não permitido' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('❌ Erro interno:', error);
    return new Response(
      JSON.stringify({ message: 'Erro interno do servidor' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});