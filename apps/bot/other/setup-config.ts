import * as fs from 'fs'
import * as path from 'path'
import * as readline from 'readline'
import { loadEnv } from '@workspace/config/index'

loadEnv()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve))
}

export async function setupConfig() {
  const envValues = {
    botToken: process.env.BOT_TOKEN || '',
    clientId: process.env.CLIENT_ID || '',
    clientSecret: process.env.CLIENT_SECRET || '',
    publicKey: process.env.PUBLIC_KEY || '',
  }

  for (const key of Object.keys(envValues)) {
    if (!envValues[key as keyof typeof envValues]) {
      envValues[key as keyof typeof envValues] = await askQuestion(`Podaj wartość dla ${key}: `)
    }
  }

  const serverId = await askQuestion('Podaj ID serwera Discord: ')
  const log4everId = await askQuestion('Podaj ID dla kanału log-4ever: ')
  const tempLogsId = await askQuestion('Podaj ID dla kanału temp-logs: ')
  const admin1 = await askQuestion('Podaj ID pierwszego admina: ')
  const admin2 = await askQuestion('Podaj ID drugiego admina: ')

  const config = {
    ...envValues,
    discordServer: {
      id: serverId,
      channels: {
        'log-4ever': log4everId,
        'temp-logs': tempLogsId,
      },
      members: {
        admins: [admin1, admin2],
      },
    },
  }

  const configDir = path.resolve(__dirname, '../config/json')
  const configPath = path.join(configDir, 'config.json')

  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true })
  }

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8')
  console.log(`Plik konfiguracyjny zapisany w ${configPath}`)

  rl.close()
}

setupConfig()
