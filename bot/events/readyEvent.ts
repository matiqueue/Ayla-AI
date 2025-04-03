import { client } from "@/bot/client/client";
import { getOrCreateLogsChannel } from "@/bot/utils/channelManager";
import { sendTempLog } from "@/bot/utils/logger";
import { GUILD_ID } from "@/bot/config/config";

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
