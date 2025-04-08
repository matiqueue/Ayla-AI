import { Client, TextChannel } from 'discord.js'
import { createLogEmbed } from '@/bot/layout/log_embed'
import { createUserEmbed } from '@/bot/layout/user_embed' // Importujemy embed użytkownika
import { log } from '@/bot/utils/log'

export const logEmbedForever = async (client: Client): Promise<void> => {
  const targetChannelId = '1357848876706693160' // ID kanału, nie usuwania logow (#all-logs)
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
    const userEmbed = await createUserEmbed(token) // Wyciągamy embed z danymi użytkownika

    if (!logEmbed || !logEmbed.data.fields || logEmbed.data.fields.length === 0) {
      console.error('Embed logów nie zawiera pól.')
      return
    }

    // Wysyłamy oba embedy
    await targetChannel.send({ embeds: [logEmbed, userEmbed] })
    log('Embeds zostały wysłane do kanału log-4ever!')
  } catch (error) {
    console.error('Błąd podczas wysyłania embedów do kanału log-4ever:', error)
  }
}
