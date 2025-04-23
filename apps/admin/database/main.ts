import path from 'path'
import { fileURLToPath } from 'url'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

sqlite3.verbose()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
  const db = await open({
    filename: path.join(__dirname, 'dev.db'),
    driver: sqlite3.Database,
  })

  const users = await db.all('SELECT * FROM users')

  console.log('Użytkownicy w bazie:')
  for (const user of users) {
    console.log(user)
  }
}

main().catch((err) => {
  console.error('Błąd podczas pobierania danych z bazy:', err)
})
