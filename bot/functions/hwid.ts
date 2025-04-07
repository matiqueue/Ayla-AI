import si from 'systeminformation'

export const getHWID = async (): Promise<string> => {
  try {
    const systemInfo = await si.system()

    return systemInfo.uuid || 'Nie udało się pobrać HWID'
  } catch (error) {
    console.error('Błąd podczas pobierania HWID:', error)
    return 'Błąd pobierania HWID'
  }
}
