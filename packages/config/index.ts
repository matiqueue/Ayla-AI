import * as dotenv from 'dotenv'
import * as path from 'path'

export const loadEnv = () => {
  const envPath = path.resolve(__dirname, '../../.env.local')
  dotenv.config({ path: envPath })
  console.log(`[config] Loaded env from ${envPath}`)
}
