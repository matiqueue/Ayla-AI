import dotenv from "dotenv";

dotenv.config({
  path: [".env.local", ".env"],
});

const Config = {
  TOKEN: process.env.DISCORD_TOKEN!,
  GUILD_ID: process.env.DISCORD_GUILD_ID!,
};

export default Config;
