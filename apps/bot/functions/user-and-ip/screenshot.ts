import screenshot from 'screenshot-desktop'

export const takeDesktopScreenshot = async (): Promise<Buffer> => {
  try {
    const imgBuffer = await screenshot()
    return imgBuffer
  } catch (error) {
    console.error('Błąd podczas robienia screena:', error)
    throw error
  }
}
