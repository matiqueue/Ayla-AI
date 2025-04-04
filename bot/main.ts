import { Client, GatewayIntentBits, Interaction, ChatInputCommandInteraction } from "discord.js";
import { createEmbed } from "./layout/embed";
import Config from "./config/config";
import { sendEmbedToLogs } from "./functions/sendEmbed";
import { clearCommand } from './slash_functions/clear';

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", async () => {
  console.log(`✅ Bot zalogowany jako ${client.user?.tag}`);
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
  if (interaction.isCommand()) {
    const commandInteraction = interaction as ChatInputCommandInteraction;
    const { commandName } = commandInteraction;

    if (commandName === "clear") {
    }
  }
});

client.login(Config.TOKEN).catch((error) => {
  console.error("❌ Błąd logowania:", error);
});