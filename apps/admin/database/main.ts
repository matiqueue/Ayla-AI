import { getDatabase } from './setup'

async function someFunction() {
  const db = await getDatabase()
  const result = await db.all('SELECT * FROM users')
  console.log(result)
}

someFunction()
