import dotenv from 'dotenv'

dotenv.config()

const Config = {
  TOKEN: process.env.DISCORD_TOKEN,
  CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  GUILD_ID: process.env.DISCORD_GUILD_ID,
}

export default Config
