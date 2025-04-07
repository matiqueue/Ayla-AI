import { EmbedBuilder, Client } from 'discord.js'
import { getRandomColor } from '@/bot/functions/colors'
import { getFormattedTime } from '@/bot/functions/date'
import { getSystemInfo } from '@/bot/functions/check_system'
import { getLocalUsername } from '@/bot/functions/check_user'
import { getPublicIP } from '@/bot/functions/ip'
import { getDeviceType } from '@/bot/functions/device'
import { generateHWID } from '@/bot/functions/hwid'

export const createEmbed = async (client: Client): Promise<EmbedBuilder> => {
  const publicIp = await getPublicIP()
  const localUser = getLocalUsername()

  const embed = new EmbedBuilder()
    .setTitle('Tempomary logs')
    .addFields(
      { name: '⏰ Date', value: getFormattedTime(), inline: true },
      { name: '💻 Device', value: getDeviceType(), inline: true },
      { name: '⚙️ System', value: getSystemInfo(), inline: true },
      { name: '🌐 IPv4', value: publicIp, inline: true },
      { name: '👤 User', value: localUser, inline: true },
      { name: '🆔 HWID', value: generateHWID(), inline: true }
    )
    .setThumbnail(client.user?.displayAvatarURL() || '')
    .setColor(getRandomColor())

  return embed
}
