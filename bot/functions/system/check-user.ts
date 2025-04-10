import os from 'os'

export const getLocalUsername = (): string => {
  const username = os.userInfo().username
  return username ? username : 'Nieznany użytkownik'
}
