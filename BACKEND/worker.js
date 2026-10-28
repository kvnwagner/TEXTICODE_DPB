// Punto de entrada para Cloudflare Workers.
// Reutiliza la misma app de Express definida en index.js y la expone
// con httpServerHandler (requiere el flag nodejs_compat).
//
// La base de datos se conecta a través de Hyperdrive (binding HYPERDRIVE),
// que es la forma recomendada por Cloudflare para usar PostgreSQL externo
// (Supabase) desde un Worker. Si no hay binding, se usa DATABASE_URL.
import { httpServerHandler } from 'cloudflare:node'
import app from './index.js'

const PORT = 3001

app.listen(PORT)

const handler = httpServerHandler({ port: PORT })

export default {
  async fetch(request, env, ctx) {
    globalThis.__TEXTICODE_HYPERDRIVE_URL = env.HYPERDRIVE?.connectionString || ''
    return handler.fetch(request, env, ctx)
  },
}
