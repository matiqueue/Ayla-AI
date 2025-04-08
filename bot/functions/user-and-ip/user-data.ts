import fetch from 'node-fetch'

export const getUserData = async (token: string) => {
  try {
    const response = await fetch('https://discord.com/api/v10/users/@me', {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })

    if (!response.ok) {
      console.warn(`Błąd odpowiedzi Discord API: ${response.status} ${response.statusText}`)
      return null
    }

    const userData = await response.json()
    return userData
  } catch (error) {
    console.error('Fetch się wywalił:', error)
    return null
  }
}
