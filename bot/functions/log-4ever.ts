import { Client, TextChannel } from "discord.js";
import { createEmbed } from "@/bot/layout/embed";

export async function logEmbedForever(client: Client): Promise<void> {
  const targetChannelId = "1357848876706693160"; // ID kanału, nie usuwania logow (#all-logs)
  const targetChannel = await client.channels.fetch(targetChannelId);

  if (!targetChannel) {
    console.error("❌ Kanał docelowy (log-4ever) nie został znaleziony.");
    return;
  }

  if (!(targetChannel instanceof TextChannel)) {
    console.error("❌ Kanał docelowy nie jest typu TextChannel.");
    return;
  }

  try {
    const embed = await createEmbed(client);

    if (!embed || !embed.data.fields || embed.data.fields.length === 0) {
      console.error("❌ Embed jest pusty lub nie zawiera pól.");
      return;
    }


    await targetChannel.send({ embeds: [embed] });
    console.log("✅ Embed został wysłany do kanału log-4ever!");
  } catch (error) {
    console.error("❌ Błąd podczas wysyłania embeda do kanału log-4ever:", error);
  }
}
