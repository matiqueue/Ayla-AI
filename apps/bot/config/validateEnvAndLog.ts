// validateEnvAndLog.ts
import * as path from 'path'
import * as fs from 'fs'
import { log } from '@/bot/utils/log'
import Config from './config'

const envPath = path.resolve(process.cwd(), '.env')
const envFileExists = fs.existsSync(envPath)

if (!envFileExists) {
  console.error('ERROR: .env file not found at', envPath)
  log('Please create a .env file with your bot configuration.')
  log('Example .env file content:')
  log('DISCORD_TOKEN=your_bot_token_here')
  log('DISCORD_CLIENT_ID=your_client_id_here')
  log('DISCORD_GUILD_ID=your_guild_id_here')
}

const { BOT_TOKEN, CLIENT_ID, DISCORD_SERVER } = Config

const validateTokenFormat = (token: string | undefined): boolean =>
  !!token && token.split('.').length === 3

const validateTokenPattern = (token: string | undefined): boolean =>
  !!token && /^[A-Za-z0-9_.-]+$/.test(token)

const validateTokenLength = (token: string | undefined): boolean =>
  !!token && token.length >= 50 && token.length <= 85

const logTokenDebugInfo = (token: string | undefined): void => {
  if (!token) {
    log('DEBUG: Token is undefined or empty')
    return
  }

  const tokenLength = token.length
  const tokenParts = token.split('.')

  log(`DEBUG: Token length: ${tokenLength} characters`)
  log(`DEBUG: Token format: ${tokenParts.length} sections separated by periods`)

  const maskedStructure = tokenParts.map((part) => '*'.repeat(part.length)).join('.')
  log(`DEBUG: Token structure: ${maskedStructure}`)
}

const missingVars = []
if (!BOT_TOKEN) missingVars.push('DISCORD_TOKEN')
if (!CLIENT_ID) missingVars.push('DISCORD_CLIENT_ID')
if (!DISCORD_SERVER.ID) missingVars.push('DISCORD_GUILD_ID')

let tokenFormatValid = false
let tokenPatternValid = false
let tokenLengthValid = false

if (BOT_TOKEN) {
  tokenFormatValid = validateTokenFormat(BOT_TOKEN)
  tokenPatternValid = validateTokenPattern(BOT_TOKEN)
  tokenLengthValid = validateTokenLength(BOT_TOKEN)
}

if (envFileExists) {
  log('.env file found')
} else {
  log('.env file not found')
}

if (BOT_TOKEN) {
  log('Bot token loaded')

  if (!tokenFormatValid) {
    log('WARNING: Token format validation failed - expected format: xxxx.yyyy.zzzz')
  }

  if (!tokenPatternValid) {
    log('WARNING: Token contains invalid characters')
  }

  if (!tokenLengthValid) {
    log('WARNING: Token length is outside the expected range (50-85 characters)')
  }

  logTokenDebugInfo(BOT_TOKEN)
} else {
  log('Bot token not found in .env file')
}

if (missingVars.length > 0) {
  console.error(`Missing required environment variables: ${missingVars.join(', ')}`)
  log('Please add them to your .env file.')
}
