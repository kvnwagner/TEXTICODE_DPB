import dotenv from 'dotenv'

dotenv.config()

const REQUIRED = ['DATABASE_URL', 'JWT_SECRET']

// En Cloudflare Workers las variables se cargan desde el dashboard después del
// primer deploy; si faltan, se avisa en los logs en vez de tumbar el Worker
// (así el deploy no falla y /health muestra el error de conexión).
const enWorkers = typeof navigator !== 'undefined' && navigator.userAgent === 'Cloudflare-Workers'

export function requireEnv(name) {
  const value = process.env[name]
  if (!value || !String(value).trim()) {
    if (enWorkers) {
      console.error(`⚠️ Falta configurar la variable de entorno requerida: ${name}`)
      return ''
    }
    throw new Error(`Falta configurar la variable de entorno requerida: ${name}`)
  }
  return value
}

export function validateEnv() {
  const missing = REQUIRED.filter(name => !process.env[name] || !String(process.env[name]).trim())
  if (missing.length) {
    throw new Error(`Variables de entorno requeridas no configuradas: ${missing.join(', ')}`)
  }
}

export const env = {
  databaseUrl: requireEnv('DATABASE_URL'),
  jwtSecret: requireEnv('JWT_SECRET'),
  jwtExpires: process.env.JWT_EXPIRES || '8h',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  googleRedirectUri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3001/api/google/callback',
  sendgridApiKey: process.env.SENDGRID_API_KEY || '',
  sendgridFromEmail: process.env.SENDGRID_FROM_EMAIL || '',
}
