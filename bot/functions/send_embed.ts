import { Client, TextChannel } from 'discord.js'
import { createLogEmbed } from '@/bot/layout/log_embed'
import { createUserEmbed } from '@/bot/layout/user_embed' // Importujemy embed użytkownika
import { deleteLastBotEmbed } from './delete_latest'
import { logEmbedForever } from './log-4ever'
import { log } from '@/bot/utils/log'

export const sendEmbedToLogs = async (client: Client) => {
  const mainChannelId = '1357349552952311929'
  const mainChannel = await client.channels.fetch(mainChannelId)

  if (!mainChannel) {
    console.error('Kanał główny nie został znaleziony.')
    return
  }

  if (!(mainChannel instanceof TextChannel)) {
    console.error('Kanał główny nie jest typu TextChannel.')
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
    await deleteLastBotEmbed(client)
    await mainChannel.send({ embeds: [logEmbed, userEmbed] })
    log('Embeds wysłane do głównego kanału!')

    await logEmbedForever(client)
  } catch (error) {
    console.error('Błąd podczas operacji z embedami:', error)
  }
}
