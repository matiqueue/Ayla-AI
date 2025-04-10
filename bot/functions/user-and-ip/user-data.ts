import axios from 'axios'

export const getUserData = async (token: string) => {
  try {
    const response = await axios.get('https://discord.com/api/v10/users/@me', {
      headers: {
        Authorization: token,
      },
    })

    console.log('Dane użytkownika:', response.data)
    return response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      console.warn(
        `Błąd odpowiedzi Discord API: ${error.response.status} ${error.response.statusText}`
      )
    } else {
      console.error('Axios się wywalił:', error.message)
    }
    return null
  }
}

getUserData('')
