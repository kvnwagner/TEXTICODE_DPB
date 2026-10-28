// Punto de entrada para Cloudflare Workers.
// Reutiliza la misma app de Express definida en index.js y la expone
// con httpServerHandler (requiere el flag nodejs_compat).
import { httpServerHandler } from 'cloudflare:node'
import app from './index.js'

const PORT = 3001

app.listen(PORT)

export default httpServerHandler({ port: PORT })
