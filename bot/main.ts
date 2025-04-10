import { startBot } from '@/bot/other/start-bot'

import Config from '@/bot/config/config'
import 'dotenv/config'

const { BOT_TOKEN } = Config

startBot(BOT_TOKEN)
