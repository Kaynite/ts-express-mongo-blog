import { createServer } from 'http';
import app from './app';
import { config } from 'dotenv';
import connectDB from './config/db';

config();
connectDB()

const server = createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`));
