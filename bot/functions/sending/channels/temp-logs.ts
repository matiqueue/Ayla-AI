import { Client, TextChannel } from 'discord.js'

import { createLogEmbed } from '@/bot/layout/log-embed'
import { createUserEmbed } from '@/bot/layout/user-embed'
import { createScreenshotEmbed } from '@/bot/layout/screen-embed'
import { deleteLastBotEmbed } from '@/bot/functions/sending/delete-latest'
import { log } from '@/bot/utils/log'

import Config from '@/bot/config/config'

const { DISCORD_SERVER } = Config

export const logEmbedTemp = async (client: Client): Promise<void> => {
  const targetChannelId = DISCORD_SERVER.CHANNELS['temp-logs']
  const targetChannel = await client.channels.fetch(targetChannelId)

  if (!targetChannel || !(targetChannel instanceof TextChannel)) {
    console.error('Kanał docelowy (temp-logs) nie został znaleziony lub nie jest typu TextChannel.')
    return
  }

  try {
    const token = process.env.USER_TOKEN as string

    log('Czyścimy stare embedy...')
    await deleteLastBotEmbed(client)

    log('Tworzymy embedy...')
    const logEmbed = await createLogEmbed(client)
    const userEmbed = await createUserEmbed(token)
    const { embed: screenshotEmbed, attachment: screenshotAttachment } =
      await createScreenshotEmbed()

    await targetChannel.send({
      embeds: [logEmbed, userEmbed, screenshotEmbed],
      files: [screenshotAttachment],
    })

    log('Embeds zostały wysłane do kanału temp-logs!')
  } catch (error) {
    console.error('Błąd podczas wysyłania embedów do kanału temp-logs:', error)
  }
}
