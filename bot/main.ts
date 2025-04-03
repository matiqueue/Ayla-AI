import { Client, GatewayIntentBits, GuildTextBasedChannel } from "discord.js";

const TOKEN = process.env.DISCORD_TOKEN!;
const GUILD_ID = process.env.DISCORD_GUILD_ID!; // ID serwera

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
  ],
});

// Funkcja tworząca lub pobierająca kanał logs
async function getOrCreateLogsChannel() {
  const guild = await client.guilds.fetch(GUILD_ID);
  if (!guild) throw new Error("❌ Nie znaleziono serwera!");

  let channel = guild.channels.cache.find(
    (ch) => ch.name === "logs" && ch.isTextBased()
  ) as GuildTextBasedChannel;

  if (!channel) {
    console.log("📁 Tworzenie kanału logs...");
    channel = (await guild.channels.create({
      name: "logs",
      type: 0, // Typ 0 = kanał tekstowy
    })) as GuildTextBasedChannel;
  } else {
    console.log("✅ Kanał logs już istnieje.");
  }

  return channel;
}

// Obsługa zdarzenia "ready"
client.once("ready", async () => {
  console.log(`✅ Bot zalogowany jako ${client.user?.tag}`);

  try {
    const logsChannel = await getOrCreateLogsChannel();
    logsChannel.send("🚀 Bot wystartował i utworzył kanał logs!");
  } catch (error) {
    console.error("❌ Błąd przy tworzeniu kanału:", error);
  }
});

// Logowanie bota
client.login(TOKEN).catch(console.error);
