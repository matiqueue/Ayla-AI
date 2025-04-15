import express, { Request, Response, NextFunction } from 'express'

const app = express()
const SERVER_PORT = process.env.SERVER_PORT || 4000

// Middleware do logowania zapytań
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
})

// Prosty endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('👋 Hello from Express + TypeScript!')
})

// Endpoint zwracający aktualny czas
app.get('/time', (req: Request, res: Response) => {
  res.json({ time: new Date().toISOString() })
})

// Obsługa 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' })
})

// Globalny error handler
app.use((err: Error, req: Request, res: Response) => {
  console.error('Unexpected error:', err)
  res.status(500).json({ error: 'Internal Server Error' })
})

app.listen(SERVER_PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${SERVER_PORT}`)
})
