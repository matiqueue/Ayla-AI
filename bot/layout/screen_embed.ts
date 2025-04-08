import { AttachmentBuilder, EmbedBuilder } from 'discord.js'
import { takeDesktopScreenshot } from '@/bot/functions/screenshot'
import { getRandomColor } from '../functions/colors'

/**
 * Tworzy embed z osadzonym screenshotem ekranu oraz attachmentem.
 * @returns Obiekt zawierający embed i attachment
 */
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
