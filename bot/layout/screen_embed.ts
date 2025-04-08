import { AttachmentBuilder, EmbedBuilder } from 'discord.js'
import { takeDesktopScreenshot } from '@/bot/functions/screenshot'
import { getRandomColor } from '@/bot/functions/colors'

export const createScreenshotEmbed = async (): Promise<{
  embed: EmbedBuilder
  attachment: AttachmentBuilder
}> => {
  const screenshotBuffer = await takeDesktopScreenshot()
  const attachment = new AttachmentBuilder(screenshotBuffer, { name: 'screenshot.png' })

  const embed = new EmbedBuilder()
    .setTitle('**🖼️ Screenshot ekranu:**')
    .setColor(getRandomColor())
    .setImage('attachment://screenshot.png')

  return {
    embed,
    attachment,
  }
}
