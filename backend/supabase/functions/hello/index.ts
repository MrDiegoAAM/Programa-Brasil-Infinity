import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  // Permitir CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey',
      },
    })
  }

  return new Response(
    JSON.stringify({ 
      message: "Hello World!", 
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url
    }),
    { 
      headers: { 
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      } 
    },
  )
})