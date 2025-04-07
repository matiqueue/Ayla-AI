import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  TextChannel,
  PermissionFlagsBits,
  MessageFlags,
} from 'discord.js'

export const clearCommand = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('🧹 Clearing messages from the channel')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  execute: async (interaction: ChatInputCommandInteraction) => {
    const channel = interaction.channel as TextChannel

    if (
      !channel
        .permissionsFor(interaction.guild!.members.me!)
        ?.has(PermissionFlagsBits.ManageMessages)
    ) {
      return interaction.reply({
        content: '❌ The bot does not have the permissions to delete messages.',
        flags: MessageFlags.Ephemeral,
      })
    }

    await interaction.deferReply({ flags: MessageFlags.Ephemeral })

    let deleted = 0
    let fetched

    do {
      fetched = await channel.messages.fetch({ limit: 100 })
      const deletable = fetched.filter(
        (msg) => Date.now() - msg.createdTimestamp < 14 * 24 * 60 * 60 * 1000
      )

      if (deletable.size > 0) {
        await channel.bulkDelete(deletable, true)
        deleted += deletable.size
      }
    } while (fetched.size >= 100)

    await interaction.editReply(`✅ Deleted **${deleted}** messages.`)
  },
}
