import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  TextChannel,
} from "discord.js";

export const clearCommand = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("🧹 Usuwa wszystkie wiadomości z bieżącego kanału"),

  async execute(interaction: ChatInputCommandInteraction) {
    try {
      if (!interaction.guild || !interaction.channel) {
        return interaction.reply({
          content: "❌ Komenda działa tylko na serwerze.",
          ephemeral: true,
        });
      }

      // Odpowiadamy od razu, żeby nie było timeouta
      await interaction.deferReply({ ephemeral: true });

      const channel = interaction.channel as TextChannel;

      let deletedCount = 0;
      let fetched;

      do {
        fetched = await channel.messages.fetch({ limit: 100 });
        const deletable = fetched.filter(
          (msg) => Date.now() - msg.createdTimestamp < 14 * 24 * 60 * 60 * 1000
        );

        if (deletable.size > 0) {
          await channel.bulkDelete(deletable, true);
          deletedCount += deletable.size;
        }
      } while (fetched.size >= 100);

      await interaction.editReply(
        `✅ Usunięto **${deletedCount}** wiadomości.`
      );
    } catch (error) {
      console.error("❌ Błąd przy /clear:", error);
      if (interaction.deferred || interaction.replied) {
        await interaction.editReply("❌ Wystąpił błąd podczas czyszczenia.");
      } else {
        await interaction.reply({
          content: "❌ Wystąpił błąd podczas czyszczenia.",
          ephemeral: true,
        });
      }
    }
  },
};
