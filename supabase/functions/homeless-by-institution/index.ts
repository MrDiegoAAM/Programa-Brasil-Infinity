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
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    if (req.method === 'GET') {
      const url = new URL(req.url)
      const institutionId = url.searchParams.get('institutionId')
      const page = parseInt(url.searchParams.get('page') || '1')
      const limit = parseInt(url.searchParams.get('limit') || '10')
      const search = url.searchParams.get('search') || ''

      if (!institutionId) {
        return new Response(
          JSON.stringify({ error: 'ID da instituição é obrigatório' }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          },
        )
      }

      // Calcular offset para paginação
      const offset = (page - 1) * limit

      // Construir query base
      let query = supabaseClient
        .from('homeless')
        .select(`
          *,
          institutions(name)
        `, { count: 'exact' })
        .eq('institution_id', institutionId)

      // Adicionar filtro de busca se fornecido
      if (search) {
        query = query.or(`name.ilike.%${search}%,cpf.ilike.%${search}%,rg.ilike.%${search}%`)
      }

      // Aplicar paginação e ordenação
      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) {
        throw error
      }

      // Mapear os dados para incluir o nome da instituição
      const homelessWithInstitution = data?.map(homeless => ({
        ...homeless,
        institution_name: homeless.institutions?.name || 'Não informado'
      })) || []

      // Calcular informações de paginação
      const totalPages = Math.ceil((count || 0) / limit)
      const hasNextPage = page < totalPages
      const hasPrevPage = page > 1

      return new Response(
        JSON.stringify({
          data: homelessWithInstitution,
          pagination: {
            currentPage: page,
            totalPages,
            totalItems: count || 0,
            itemsPerPage: limit,
            hasNextPage,
            hasPrevPage
          }
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
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
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})