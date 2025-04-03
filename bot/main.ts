import {
  Client,
  GatewayIntentBits,
  TextChannel,
  EmbedBuilder,
} from "discord.js";
import dotenv from "dotenv";

dotenv.config({
  path: [".env.local", ".env"],
});

const TOKEN = process.env.DISCORD_TOKEN!;
const GUILD_ID = process.env.DISCORD_GUILD_ID!;

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

// Funkcja tworząca lub pobierająca kanał logs
async function getOrCreateLogsChannel(guildId: string): Promise<TextChannel> {
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
}

// Funkcja wysyłająca osadzoną wiadomość z danymi tymczasowymi
async function sendTempLog(channel: TextChannel) {
  // Przykładowe dane tymczasowe
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
      iconURL: client.user?.avatarURL() || undefined,
    })
    .setTimestamp();

  await channel.send({ embeds: [embed] });
}

// Obsługa zdarzenia "ready"
client.once("ready", async () => {
  console.log(`✅ Bot zalogowany jako ${client.user?.tag}`);

  try {
    const logsChannel = await getOrCreateLogsChannel(GUILD_ID);
    await sendTempLog(logsChannel);
    console.log("🚀 Logi tymczasowe zostały wysłane!");
  } catch (error) {
    console.error("❌ Błąd przy wysyłaniu logów:", error);
  }
});

// Logowanie bota
client.login(TOKEN).catch(console.error);
