import { publicIpv4 } from 'public-ip'

export const getPublicIP = async (): Promise<string> => {
  try {
    const ip = await publicIpv4()
    return ip
  } catch (error) {
    console.error('Błąd podczas pobierania publicznego IP:', error)
    return 'Brak dostępu do IP'
  }
}
