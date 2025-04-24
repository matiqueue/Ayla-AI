import path from 'path'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function setupDatabase() {
  const db = await open({
    filename: path.join(__dirname, '..', 'data', 'dev.db'),
    driver: sqlite3.Database,
  })

  await db.exec(`
CREATE TABLE Statistics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    value TEXT,
    percentage TEXT,
    daily INTEGER,
    weekly INTEGER,
    monthly INTEGER,
    desktop INTEGER,
    mobile INTEGER,
    tablet INTEGER,
    since_last_hour TEXT
);
CREATE TABLE Users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    cash TEXT,
    status TEXT,
    address TEXT,
    phone TEXT
);
CREATE TABLE Products (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price TEXT,
    stock INTEGER
);
CREATE TABLE Teams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    group_label TEXT NOT NULL,
    team_label TEXT NOT NULL,
    team_value TEXT NOT NULL
);
  `)

  return db
}

setupDatabase().catch((err) => {
  console.error('Coś poszło nie tak', err)
})
