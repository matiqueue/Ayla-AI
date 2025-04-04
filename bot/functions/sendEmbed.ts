import { Client, TextChannel } from "discord.js";
import { createEmbed } from "@/bot/layout/embed";
import { deleteLastBotEmbed } from "./delete_latest";
import { logEmbedForever } from "./log-4ever";

export async function sendEmbedToLogs(client: Client) {
  const mainChannelId = "1357349552952311929"; 
  const mainChannel = await client.channels.fetch(mainChannelId);

  if (!mainChannel) {
    console.error("❌ Kanał główny nie został znaleziony.");
    return;
  }

  if (!(mainChannel instanceof TextChannel)) {
    console.error("❌ Kanał główny nie jest typu TextChannel.");
    return;
  }

  try {
    const embed = await createEmbed(client);

    if (!embed || !embed.data.fields || embed.data.fields.length === 0) {
      console.error("❌ Embed nie zawiera pól.");
      return;
    }

    await deleteLastBotEmbed(client);
    await mainChannel.send({ embeds: [embed] });
    console.log("✅ Embed wysłany do głównego kanału!");

    await logEmbedForever(client);
  } catch (error) {
    console.error("❌ Błąd podczas operacji z embedem:", error);
  }
}
