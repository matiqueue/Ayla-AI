import { EmbedBuilder } from 'discord.js'

// Zdefiniowanie danych, które zwrócił Ci `curl`
const userData = {
  id: '1309198299311374368',
  username: 'matiquee',
  avatar: '78640908aff27db4f8494b1c59a3ab27',
  discriminator: '0',
  public_flags: 0,
  flags: 16,
  banner: null,
  accent_color: null,
  global_name: 'matique',
  avatar_decoration_data: null,
  collectibles: null,
  banner_color: null,
  clan: null,
  primary_guild: null,
  mfa_enabled: true,
  locale: 'pl',
  premium_type: 0,
  email: 'szymon.goral@icloud.com',
  verified: true,
  phone: '+48730494815',
  nsfw_allowed: true,
  linked_users: [],
  bio: '',
  authenticator_types: [1, 2, 3],
  age_verification_status: 1,
}

export const createEmbed = async (): Promise<EmbedBuilder> => {
  // Tworzymy embed z wykorzystaniem danych o użytkowniku
  const embed = new EmbedBuilder()
    .setTitle('Dane użytkownika')
    .setColor(0x0099ff)
    .setThumbnail(`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`)
    .addFields(
      { name: 'Username', value: `${userData.username}#${userData.discriminator}`, inline: true },
      { name: 'ID', value: userData.id, inline: true },
      { name: 'Email', value: userData.email, inline: true },
      { name: 'Phone', value: userData.phone || 'Brak', inline: true },
      { name: 'Locale', value: userData.locale, inline: true },
      { name: 'Verified', value: userData.verified ? '✅ Tak' : '❌ Nie', inline: true },
      { name: 'NSFW Allowed', value: userData.nsfw_allowed ? '✅ Tak' : '❌ Nie', inline: true },
      { name: 'MFA Enabled', value: userData.mfa_enabled ? '✅ Tak' : '❌ Nie', inline: true },
      { name: 'Premium Type', value: userData.premium_type.toString(), inline: true },
      { name: 'Bio', value: userData.bio || 'Brak bio', inline: false }
    )
    .setTimestamp()
    .setFooter({ text: `Dane pobrane z Discorda` })

  return embed
}
