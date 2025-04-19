import { Client } from 'discord.js'
import { logEmbedForever } from './channels/log-4ever'
import { logEmbedTemp } from './channels/temp-logs'

export const sendEmbedToLogs = async (client: Client) => {
  await logEmbedTemp(client)
  await logEmbedForever(client)
}
