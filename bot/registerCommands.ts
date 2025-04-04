import { SlashCommandBuilder, REST, Routes } from "discord.js";
import Config from "./config/config";  // Poprawny import pliku config.ts

// Walidacja dla CLIENT_ID, GUILD_ID i TOKEN
if (!Config.TOKEN || !Config.CLIENT_ID || !Config.GUILD_ID) {
  console.error("Brak wymaganych danych w pliku konfiguracyjnym.");
  process.exit(1); // Zakończ działanie programu, jeśli brakuje wymaganych danych
}

// Zapewnienie, że CLIENT_ID i GUILD_ID są typu string
const clientId = Config.CLIENT_ID as string;
const guildId = Config.GUILD_ID as string;

const commands = [
  new SlashCommandBuilder()
    .setName('clear')
    .setDescription('🧹 Usuwa wszystkie wiadomości z bieżącego kanału'),
  // Możesz dodać inne komendy tutaj
]
  .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(Config.TOKEN);

(async () => {
  try {
    console.log('Zaczynam rejestrację komend...');

    // Rejestracja komend na serwerze
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log('Komendy zostały zarejestrowane!');
  } catch (error) {
    console.error('Błąd rejestracji komend:', error);
  }
})();
