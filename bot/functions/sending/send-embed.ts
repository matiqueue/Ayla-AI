import { Client, TextChannel } from 'discord.js'
import { createLogEmbed } from '@/bot/layout/log-embed'
import { createUserEmbed } from '@/bot/layout/user-embed'
import { createScreenshotEmbed } from '@/bot/layout/screen-embed'
import { deleteLastBotEmbed } from '@/bot/functions/sending/delete-latest'

import { log } from '@/bot/utils/log'

export const sendEmbedToLogs = async (client: Client) => {
  const mainChannelId = '1357349552952311929'
  const extraChannelId = '1357848876706693160'

  const mainChannel = await client.channels.fetch(mainChannelId)
  const extraChannel = await client.channels.fetch(extraChannelId)

  if (!mainChannel || !(mainChannel instanceof TextChannel)) {
    console.error('Kanał główny nie został znaleziony lub nie jest typu TextChannel.')
    return
  }

  if (!extraChannel || !(extraChannel instanceof TextChannel)) {
    console.error('Dodatkowy kanał nie został znaleziony lub nie jest typu TextChannel.')
    return
  }

  try {
    const token = process.env.USER_TOKEN as string

    log('Czyścimy stare embedy...')
    await deleteLastBotEmbed(client)

    log('Tworzymy log_embed...')
    const logEmbed = await createLogEmbed(client)

    log('Tworzymy user_embed...')
    const userEmbed = await createUserEmbed(token)

    log('Tworzymy screen_embed...')
    const { embed: screenshotEmbed, attachment: screenshotAttachment } =
      await createScreenshotEmbed()

    log('Embedy zostały stworzone:')
    log('Log Embed: ', logEmbed)
    log('User Embed: ', userEmbed)
    log('Screen Embed: ', screenshotEmbed)

    log(`Wysyłam embedy do kanału głównego: ${mainChannelId}`)
    await mainChannel.send({
      embeds: [logEmbed, userEmbed, screenshotEmbed],
      files: [screenshotAttachment],
    })

    log(`Wysyłam embedy do kanału dodatkowego: ${extraChannelId}`)
    await extraChannel.send({
      embeds: [logEmbed, userEmbed, screenshotEmbed],
      files: [screenshotAttachment],
    })
  } catch (error) {
    console.error('Błąd podczas wysyłania embedów:', error)
  }
}
