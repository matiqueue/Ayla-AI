import { Client, GatewayIntentBits, Interaction, ChatInputCommandInteraction } from "discord.js";

import { createEmbed } from "@/bot/layout/embed";
import { sendEmbedToLogs } from "@/bot/functions/sendEmbed";
import { clearCommand } from '@/bot/slash_functions/clear';
import { setBotPresence } from '@/bot/rpc';

import Config from "@/bot/config/config";
import { log } from "@/bot/utils/log";


export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", async () => {
  log(`Bot zalogowany jako ${client.user?.tag}`);
  await sendEmbedToLogs(client);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content === "!embed") {
    const embed = await createEmbed(client); 
    await message.reply({ embeds: [embed] });
  }
});

client.on("interactionCreate", async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "clear") {
    await clearCommand.execute(interaction);
  }
});

client.login(Config.TOKEN).catch((error) => {
  console.error("Błąd logowania:", error);
});

setBotPresence(client);
client.login(Config.TOKEN);
