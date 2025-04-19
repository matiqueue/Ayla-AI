import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { checkBotStatus, startBot } from './dir/bot-status';

dotenv.config();

const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 4000;

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('👋 Hello from Express + TypeScript!');
});

app.get('/time', (req: Request, res: Response) => {
  res.json({ time: new Date().toISOString() });
});

app.get('/bot-status', checkBotStatus);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err: Error, req: Request, res: Response) => {
  console.error('Unexpected error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is running at http://localhost:${SERVER_PORT}`);
});

startBot();
