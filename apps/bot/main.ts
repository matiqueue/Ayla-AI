import { startBot } from '@/bot/other/start-bot'
import { loadEnv } from '@workspace/config/index'
import Config from '@/bot/config/config'

loadEnv()
const { BOT_TOKEN } = Config

startBot(BOT_TOKEN)
