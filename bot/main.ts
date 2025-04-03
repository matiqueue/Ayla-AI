import { client } from "@/bot/client/client";
import { onReady } from "@/bot/events/readyEvent";

client.once("ready", onReady);

client.login(process.env.DISCORD_TOKEN!).catch(console.error);