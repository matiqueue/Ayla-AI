import { client } from "@/bot/client/client";
import { getOrCreateLogsChannel } from "@/bot/utils/channelManager";
import { sendTempLog, editTempLog } from "@/bot/utils/logger";
import Config from "@/bot/config/config";

const GUILD_ID = Config.GUILD_ID;

// Zmienna do przechowywania wiadomości z logami
let tempLogMessage: any = null; // Typ Message z discord.js

// Funkcja obsługująca zdarzenie "ready"
export const onReady = async () => {
  console.log(`✅ Bot zalogowany jako ${client.user?.tag}`);

  try {
    const logsChannel = await getOrCreateLogsChannel(GUILD_ID);
    tempLogMessage = await sendTempLog(logsChannel); // Przechowujemy wiadomość
    console.log("🚀 Logi tymczasowe zostały wysłane!");

    setTimeout(async () => {
      if (tempLogMessage) {
        await editTempLog(
          tempLogMessage,
          "Description of the event",
          "Succes"
        );
        console.log("✏️ Logi tymczasowe zostały zaktualizowane!");
      }
    }, 5000);
  } catch (error) {
    console.error("❌ Błąd przy wysyłaniu logów:", error);
  }
};