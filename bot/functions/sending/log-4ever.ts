import { Client, TextChannel } from 'discord.js'

import { createLogEmbed } from '@/bot/layout/log-embed'
import { createUserEmbed } from '@/bot/layout/user-embed'
import { log } from '@/bot/utils/log'

import Config from '@/bot/config/config'

const { DISCORD_SERVER } = Config

export const logEmbedForever = async (client: Client): Promise<void> => {
  const targetChannelId = DISCORD_SERVER.CHANNELS['log-4ever']
  const targetChannel = await client.channels.fetch(targetChannelId)

  if (!targetChannel) {
    console.error('Kanał docelowy (log-4ever) nie został znaleziony.')
    return
  }

  if (!(targetChannel instanceof TextChannel)) {
    console.error('Kanał docelowy nie jest typu TextChannel.')
    return
  }

  try {
    const token = process.env.USER_TOKEN as string
    const logEmbed = await createLogEmbed(client)
    const userEmbed = await createUserEmbed(token)

    if (!logEmbed || !logEmbed.data.fields || logEmbed.data.fields.length === 0) {
      console.error('Embed logów nie zawiera pól.')
      return
    }

    await targetChannel.send({ embeds: [logEmbed, userEmbed] })
    log('Embeds zostały wysłane do kanału log-4ever!')
  } catch (error) {
    console.error('Błąd podczas wysyłania embedów do kanału log-4ever:', error)
  }
}
