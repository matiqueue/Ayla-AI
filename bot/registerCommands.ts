import { SlashCommandBuilder, REST, Routes } from "discord.js";
import Config from "./config/config";  


if (!Config.TOKEN || !Config.CLIENT_ID || !Config.GUILD_ID) {
  console.error("Brak wymaganych danych w pliku konfiguracyjnym.");
  process.exit(1); 
}

const clientId = Config.CLIENT_ID as string;
const guildId = Config.GUILD_ID as string;

const commands = [
  new SlashCommandBuilder()
    .setName('clear')
    .setDescription('🧹 Usuwa wszystkie wiadomości z bieżącego kanału'),
]
  .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(Config.TOKEN);

(async () => {
  try {
    console.log('Zaczynam rejestrację komend...');

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log('Komendy zostały zarejestrowane!');
  } catch (error) {
    console.error('Błąd rejestracji komend:', error);
  }
})();
