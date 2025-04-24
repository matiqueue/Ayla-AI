import { NextResponse } from 'next/server'
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function getDb() {
  return open({
    filename: path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      '..',
      'packages',
      'database',
      'data',
      'dev.db'
    ),
    driver: sqlite3.Database,
  })
}

export async function GET() {
  try {
    const db = await getDb()
    const statistics = await db.all('SELECT * FROM Statistics')
    await db.close()
    return NextResponse.json(statistics)
  } catch (error) {
    console.error('Error fetching statistics:', error)
    return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 })
  }
}
