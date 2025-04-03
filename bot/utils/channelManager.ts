import { TextChannel } from "discord.js";
import { client } from "../client/client";

// Funkcja tworząca lub pobierająca kanał logs
export const getOrCreateLogsChannel = async (
  guildId: string
): Promise<TextChannel> => {
  const guild = await client.guilds.fetch(guildId);
  if (!guild) throw new Error("❌ Nie znaleziono serwera!");

  let logsChannel = guild.channels.cache.find(
    (channel) => channel.name === "logs" && channel instanceof TextChannel
  ) as TextChannel | undefined;

  if (!logsChannel) {
    console.log("📁 Tworzenie kanału #logs...");
    logsChannel = await guild.channels.create({
      name: "logs",
      type: 0, // 0 oznacza kanał tekstowy
    });
  } else {
    console.log("✅ Kanał #logs już istnieje.");
  }

  return logsChannel;
};
