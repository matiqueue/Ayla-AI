import { client } from "../client/client";
import { getOrCreateLogsChannel } from "../utils/channelManager";
import { sendTempLog } from "../utils/logger";
import { GUILD_ID } from "../config/config";

// Funkcja obsługująca zdarzenie "ready"
export const onReady = async () => {
  console.log(`✅ Bot zalogowany jako ${client.user?.tag}`);

  try {
    const logsChannel = await getOrCreateLogsChannel(GUILD_ID);
    await sendTempLog(logsChannel);
    console.log("🚀 Logi tymczasowe zostały wysłane!");
  } catch (error) {
    console.error("❌ Błąd przy wysyłaniu logów:", error);
  }
};
