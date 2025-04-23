import path from 'path'
import { fileURLToPath } from 'url'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

sqlite3.verbose()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function setupDatabase() {
  const db = await open({
    filename: path.join(__dirname, 'dev.db'),
    driver: sqlite3.Database,
  })

  // Tworzenie tabeli
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    );
  `)

  console.log('Tabela "users" została utworzona lub już istnieje.')

  // Przykładowi użytkownicy
  const users = [
    { name: 'Ayla', email: 'ayla@example.com' },
    { name: 'Sebastian', email: 'sebastian@example.com' },
    { name: 'Admin', email: 'admin@example.com' },
  ]

  // Dodawanie użytkowników
  for (const user of users) {
    try {
      await db.run('INSERT INTO users (name, email) VALUES (?, ?)', user.name, user.email)
      console.log(`Dodano użytkownika: ${user.name}`)
    } catch (err: any) {
      if (err.code === 'SQLITE_CONSTRAINT') {
        console.log(`Użytkownik z mailem ${user.email} już istnieje – pomijam.`)
      } else {
        console.error(`Błąd przy dodawaniu ${user.name}:`, err)
      }
    }
  }

  console.log('Baza danych została przygotowana z przykładowymi danymi.')

  return db
}

// ESM: uruchom tylko jeśli plik odpalony bezpośrednio
if (process.argv[1] === __filename) {
  setupDatabase()
}

export default setupDatabase
