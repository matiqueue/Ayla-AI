import { Client, GatewayIntentBits } from 'discord.js'
import * as dotenv from 'dotenv'
import { Request, Response } from 'express'

dotenv.config()

let isBotReady = false
let botLoginError: string | null = null
const BOT_TOKEN = process.env.BOT_TOKEN

export const checkBotStatus = (req: Request, res: Response): void => {
  if (isBotReady) {
    res.json({ status: 'online' })
  } else {
    res.status(503).json({ status: 'offline', error: botLoginError || 'Bot not initialized' })
  }
}

export const startBot = (): void => {
  if (!BOT_TOKEN) {
    botLoginError = 'BOT_TOKEN is missing from environment variables.'
    console.error('❌ ' + botLoginError)
  } else {
    const client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    })

    client.once('ready', () => {
      isBotReady = true
      console.log(`ayla dziala jako: ${client.user?.tag}`)
    })

    client.on('messageCreate', (message) => {
      console.log(`[Discord] ${message.author.tag}: ${message.content}`)
    })

    client.login(BOT_TOKEN).catch((err) => {
      botLoginError = `Ayla bot nie mogla sie zalogowac: ${err.message}`
      console.error('❌ ' + botLoginError)
    })
  }
}
