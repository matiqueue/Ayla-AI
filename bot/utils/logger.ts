import { EmbedBuilder, TextChannel } from "discord.js";

// Funkcja wysyłająca osadzoną wiadomość z danymi tymczasowymi
export const sendTempLog = async (channel: TextChannel) => {
  const tempData = {
    description: "Przykładowy opis zdarzenia.",
    timestamp: new Date(),
    status: "Sukces",
  };

  const embed = new EmbedBuilder()
    .setTitle("📋 Nowe logi tymczasowe")
    .setColor(0x00ff00)
    .setDescription(tempData.description)
    .addFields(
      {
        name: "🕒 Czas",
        value: tempData.timestamp.toISOString(),
        inline: true,
      },
      { name: "✅ Status", value: tempData.status, inline: true }
    )
    .setFooter({
      text: "Logger Bot",
      iconURL: channel.client.user?.avatarURL() || undefined,
    })
    .setTimestamp();

  await channel.send({ embeds: [embed] });
};
