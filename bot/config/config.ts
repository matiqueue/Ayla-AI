import dotenv from "dotenv";

dotenv.config({
  path: [".env.local", ".env"],
});

export const TOKEN = process.env.DISCORD_TOKEN!;
export const GUILD_ID = process.env.DISCORD_GUILD_ID!;
