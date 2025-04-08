import { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'
import { createUserEmbed } from '@/bot/layout/user_embed'

export const scrapUserCommand = {
  data: new SlashCommandBuilder()
    .setName('zapierdoldane')
    .setDescription('😎 Zapierdala dane użytkownika z podanego tokena')
    .addStringOption((option) =>
      option.setName('token').setDescription('Token użytkownika Discord').setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .toJSON(),

  async execute(interaction: ChatInputCommandInteraction) {
    const token = interaction.options.getString('token', true)

    await interaction.deferReply({ ephemeral: true })

    try {
      const embed = await createUserEmbed(token)
      await interaction.editReply({ embeds: [embed] })
    } catch (err) {
      console.error('Błąd przy /scrapuser:', err)
      await interaction.editReply({
        content: '❌ Coś poszło nie tak przy pobieraniu danych mordko 😢',
      })
    }
  },
}
