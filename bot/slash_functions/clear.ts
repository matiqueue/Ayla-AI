import { ChatInputCommandInteraction, SlashCommandBuilder, TextChannel } from "discord.js";

export const clearCommand = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("🧹 Usuwa wszystkie wiadomości z bieżącego kanału"),

  async execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.channel || !interaction.guild) {
      return interaction.reply({ content: "❌ Komenda dostępna tylko na serwerach.", ephemeral: true });
    }

    const channel = interaction.channel;

    // Sprawdzamy, czy kanał jest kanałem tekstowym (tylko na kanałach TextChannel działa bulkDelete)
    if (!(channel instanceof TextChannel)) {
      return interaction.reply({ content: "❌ Ta komenda działa tylko na kanałach tekstowych.", ephemeral: true });
    }

    await interaction.deferReply({ ephemeral: true });

    try {
      let fetched;
      let deletedCount = 0;

      do {
        // Pobieramy 100 wiadomości w każdej iteracji
        fetched = await channel.messages.fetch({ limit: 100 });
        const deletable = fetched.filter(msg => (Date.now() - msg.createdTimestamp) < 14 * 24 * 60 * 60 * 1000); // Wiadomości nie starsze niż 14 dni

        if (deletable.size > 0) {
          await channel.bulkDelete(deletable, true); // Usuwamy wiadomości
          deletedCount += deletable.size;
        }
      } while (fetched.size >= 100); // Kontynuujemy usuwanie, dopóki są wiadomości

      await interaction.editReply(`✅ Usunięto **${deletedCount}** wiadomości.`);
    } catch (err) {
      console.error("❌ Błąd przy usuwaniu wiadomości:", err);
      await interaction.editReply("❌ Wystąpił błąd przy usuwaniu wiadomości.");
    }
  },
};
