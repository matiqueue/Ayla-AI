import * as fs from 'fs'
import * as path from 'path'
import { log } from '../utils/log'
import { loadEnv } from '@workspace/config/index'

loadEnv()

const configPath = path.resolve(__dirname, './json/config.json')

let fileConfig = {
  botToken: '',
  clientId: '',
  clientSecret: '',
  publicKey: '',
  discordServer: {
    id: '',
    channels: {
      'log-4ever': '',
      'temp-logs': '',
    },
    members: {
      admins: [] as string[],
    },
  },
}

if (fs.existsSync(configPath)) {
  try {
    const raw = fs.readFileSync(configPath, 'utf-8')
    fileConfig = JSON.parse(raw)
    log('Plik config.json został odczytany pomyślnie.')
  } catch (error) {
    console.error('Błąd przy odczycie config.json:', error)
  }
} else {
  console.warn('Plik config.json nie został znaleziony, używane będą puste wartości.')
}

const Config = {
  BOT_TOKEN: fileConfig.botToken || process.env.BOT_TOKEN || '',
  CLIENT_ID: fileConfig.clientId || process.env.CLIENT_ID || '',
  CLIENT_SECRET: fileConfig.clientSecret || process.env.CLIENT_SECRET || '',
  PUBLIC_KEY: fileConfig.publicKey || process.env.PUBLIC_KEY || '',
  DISCORD_SERVER: {
    ID: fileConfig.discordServer.id || '',
    CHANNELS: {
      'log-4ever': fileConfig.discordServer.channels['log-4ever'] || '',
      'temp-logs': fileConfig.discordServer.channels['temp-logs'] || '',
    },
    MEMBERS: {
      ADMINS: fileConfig.discordServer.members.admins || [],
    },
  },
}

export default Config
