// import { TextChannel } from "discord.js";
// import { sendTempLog } from "@/bot/utils/logger";

// // Funkcja wywołująca komendę do logów
// export const tempLogCommand = async (channel: TextChannel) => {
//   await sendTempLog(channel);
// };



import { TextChannel } from "discord.js";
import { sendTempLog, editTempLog } from "@/bot/utils/logger";

// Zmienna do przechowywania wiadomości z logami (współdzielona z readyEvents)
let tempLogMessage: any = null; // Typ Message z discord.js

// Funkcja wywołująca komendę do logów
export const tempLogCommand = async (
  channel: TextChannel,
  action: "send" | "edit" = "send",
  newDescription?: string,
  newStatus?: string
) => {
  if (action === "send") {
    tempLogMessage = await sendTempLog(channel); // Wysłanie nowej wiadomości
    console.log("📋 Nowe logi zostały wysłane przez komendę!");
  } else if (action === "edit" && tempLogMessage) {
    await editTempLog(
      tempLogMessage,
      newDescription || "Przykładowy opis po edycji.",
      newStatus || "Sukces"
    );
    console.log("✏️ Logi zostały zaktualizowane przez komendę!");
  } else {
    console.log("⚠️ Brak wiadomości do edycji lub nieprawidłowa akcja.");
  }
};
