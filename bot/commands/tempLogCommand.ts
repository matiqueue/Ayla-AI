import { TextChannel } from "discord.js";
import { sendTempLog } from "../utils/logger";

// Funkcja wywołująca komendę do logów
export const tempLogCommand = async (channel: TextChannel) => {
  await sendTempLog(channel);
};
