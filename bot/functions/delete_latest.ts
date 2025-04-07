import { Client, TextChannel, Message } from "discord.js";
import { log } from "@/bot/utils/log";

const LOG_CHANNEL_ID = "1357349552952311929";

export const deleteLastBotEmbed = async (client: Client): Promise<void> => {
  try {
    const channel = await client.channels.fetch(LOG_CHANNEL_ID);

    if (!channel || !(channel instanceof TextChannel)) {
      console.error("Nie znaleziono kanału tekstowego logów.");
      return;
    }

    const messages = await channel.messages.fetch({ limit: 10 });

    const botEmbedMessage = messages.find(
      (msg: Message) =>
        msg.author.id === client.user?.id && msg.embeds.length > 0
    );

    if (botEmbedMessage) {
      await botEmbedMessage.delete();
      log("Poprzedni embed został usunięty.");
    } else {
      log("Nie znaleziono wcześniejszego embeda do usunięcia.");
    }
  } catch (error) {
    console.error("Błąd podczas usuwania embeda:", error);
  }
};
