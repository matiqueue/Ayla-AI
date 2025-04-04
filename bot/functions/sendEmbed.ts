import { Client, TextChannel } from "discord.js";
import { createEmbed } from "../layout/embed";
import { deleteLastBotEmbed } from "./delete_latest"; 


export async function sendEmbedToLogs(client: Client) {
  const channelId = "1357349552952311929"; 
  const channel = await client.channels.fetch(channelId);

  if (!channel) {
    console.error("❌ Kanał nie został znaleziony.");
    return;
  }

  if (!(channel instanceof TextChannel)) {
    console.error("❌ Kanał nie jest typu TextChannel.");
    return;
  }

  try {
    const embed = await createEmbed(client);

    if (!embed || embed.data.fields?.length === 0) {
      console.error("❌ Embed nie zawiera pól.");
      return;
    }

    await deleteLastBotEmbed(client);
    await channel.send({ embeds: [embed] });
    console.log("✅ Embed wysłany!");
  } catch (error) {
    console.error("❌ Błąd podczas operacji z embedem:", error);
  }
}
