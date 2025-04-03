import { Client, GatewayIntentBits } from "discord.js";
import { TOKEN } from "@/bot/config/config";

export const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.login(TOKEN).catch(console.error);
