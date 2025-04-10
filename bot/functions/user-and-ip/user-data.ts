import axios from 'axios'

export const getUserData = async (token: string) => {
  const response = await axios.get('https://discord.com/api/v10/users/@me', {
    headers: {
      Authorization: token,
    },
  })

  return response.data
}
