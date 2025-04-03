import { Client, GatewayIntentBits } from "discord.js";
import Config from "@/bot/config/config";

const TOKEN = Config.TOKEN;

export const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.login(TOKEN).catch(console.error);
