import { Client, GatewayIntentBits } from "discord.js";
import { TOKEN } from "../config/config";

export const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.login(TOKEN).catch(console.error);
