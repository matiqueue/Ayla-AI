import { Client, TextChannel, Message } from 'discord.js'
import { log } from '@/bot/utils/log'

const LOG_CHANNEL_ID = '1357349552952311929'

export const deleteLastBotEmbed = async (client: Client): Promise<void> => {
  try {
    const channel = await client.channels.fetch(LOG_CHANNEL_ID)

    if (!channel || !(channel instanceof TextChannel)) {
      console.error('Nie znaleziono kanału tekstowego logów.')
      return
    }

    const messages = await channel.messages.fetch({ limit: 10 })

    const botMessages = messages.filter(
      (msg: Message) =>
        msg.author.id === client.user?.id && (msg.embeds.length > 0 || msg.attachments.size > 0)
    )

    if (botMessages.size === 0) {
      log('Nie znaleziono wcześniejszych wiadomości bota do usunięcia.')
      return
    }

    for (const [, msg] of botMessages) {
      await msg.delete()
    }

    log(`Usunięto ${botMessages.size} wiadomości bota (embedy i/lub screenshoty).`)
  } catch (error) {
    console.error('Błąd podczas usuwania wiadomości bota:', error)
  }
}
