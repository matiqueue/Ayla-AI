import { Client, GatewayIntentBits } from "discord.js";
import config from "@/bot/config/config";

const TOKEN = config.TOKEN;

export const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.login(TOKEN).catch(console.error);
