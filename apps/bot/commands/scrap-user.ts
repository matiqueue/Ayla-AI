import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from 'discord.js'
import { getRandomColor } from '@/bot/functions/visual-embed/colors'
import { getUserData } from '@/bot/functions/user-and-ip/user-data'

const admins = ['adminID1', 'adminID2']

export const scrapUserCommand = {
  data: new SlashCommandBuilder()
    .setName('zapierdoldane')
    .setDescription('🤯 Zapierdala dane użytkownika z podanego tokena')
    .addStringOption((option) =>
      option.setName('token').setDescription('Token użytkownika Discord').setRequired(true)
    )
    .toJSON(),

  async execute(interaction: ChatInputCommandInteraction) {
    const userId = interaction.user.id

    if (!admins.includes(userId)) {
      return await interaction.reply({
        content: '❌ You must be an admin to use this command.',
        ephemeral: true,
      })
    }

    await interaction.deferReply({ ephemeral: true })

    try {
      // Pobieranie danych użytkownika
      const userData = (await getUserData(process.env.TOKEN!)) as {
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
        return await interaction.editReply({
          content: '❌ Nie udało się pobrać danych użytkownika, chuj nam w dupe ;(',
        })
      }

      const embed = new EmbedBuilder()
        .setTitle(`💥 Zapierdolono dane użytkownika ${userData.username}#${userData.discriminator}`)
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

      await interaction.editReply({ embeds: [embed] })
    } catch (err) {
      console.error('Błąd przy /zapierdol:', err)
      await interaction.editReply({
        content: '❌ Coś poszło nie tak przy pobieraniu danych mordko 😢',
      })
    }
  },
}
