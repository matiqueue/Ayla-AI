import fetch from 'node-fetch'

export const getUserData = async (token: string) => {
  const response = await fetch('https://discord.com/api/v10/users/@me', {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch user data')
  }

  const userData = await response.json()
  return userData
}
