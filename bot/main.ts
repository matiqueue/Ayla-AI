import { client } from "./client/client";
import { onReady } from "./events/readyEvent";

client.once("ready", onReady);

client.login(process.env.DISCORD_TOKEN!).catch(console.error);
