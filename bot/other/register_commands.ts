import { REST, Routes } from 'discord.js'
import { clearCommand } from '@/bot/commands/clear'

import Config from '@/bot/config/config'
import { scrapUserCommand } from '../commands/scrap_user'

const commands = [clearCommand.data.toJSON(), scrapUserCommand.data]

const rest = new REST({ version: '10' }).setToken(Config.TOKEN!)

;(async () => {
  try {
    console.log('Rejestruję globalne komendy slash...')
    await rest.put(Routes.applicationCommands(Config.CLIENT_ID!), { body: commands })
    console.log('Zarejestrowano globalnie komendy slash!')
  } catch (err) {
    console.error('Błąd podczas rejestrowania komend:', err)
  }
})()
