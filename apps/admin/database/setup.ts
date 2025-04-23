// db.ts
import sqlite3 from 'sqlite3'
import { Database, open } from 'sqlite'

// Typ dla konfiguracji bazy danych
interface DatabaseConfig {
  filename: string
  driver: typeof sqlite3.Database
}

// Funkcja do inicjacji połączenia z bazą danych
async function initDatabase(): Promise<Database> {
  try {
    const db = await open({
      filename: './database/dev.db',
      driver: sqlite3.Database,
    })

    console.log('Połączono z bazą danych SQLite: dev.db')
    return db
  } catch (error) {
    console.error('Błąd podczas łączenia z bazą danych:', error)
    throw new Error('Nie udało się połączyć z bazą danych')
  }
}

// Eksport singletona bazy danych
let dbInstance: Database | null = null

export async function getDatabase(): Promise<Database> {
  if (!dbInstance) {
    dbInstance = await initDatabase()
  }
  return dbInstance
}

// Przykład użycia
async function main() {
  try {
    const db = await getDatabase()

    // Przykład zapytania
    await db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)')
    console.log('Tabela users utworzona lub już istnieje')

    // Wstawianie danych
    await db.run('INSERT INTO users (name) VALUES (?)', 'Jan Kowalski')
    console.log('Dodano przykładowego użytkownika')

    // Pobieranie danych
    const users = await db.all('SELECT * FROM users')
    console.log('Użytkownicy:', users)
  } catch (error) {
    console.error('Wystąpił błąd:', error)
  }
}

// Uruchom przykład, jeśli plik jest uruchamiany bezpośrednio
if (require.main === module) {
  main()
}
