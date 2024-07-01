import express from 'express';
import { loggingFunction } from './middleware/loggingHandler.js';
import cors from 'cors';
import { routeNotFound } from './middleware/routeNotFound.js';
import router from './routes/index.js';
import { PrismaClient } from '@prisma/client';
export const app = express();

export const prismaClient = new PrismaClient({
    log: ['query', 'error']
});
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '24kb' }));
app.use(express.static('public'));
app.use(loggingFunction);
app.use(cors());

app.use('/api/v1', router);

app.get('/healthCheck', (req, res, next) => {
    return res.status(200).json({ message: 'Server is Healthy 💪💚🥗🧘‍♀️🥗🍎🌱🔆' });
});
app.use(routeNotFound);
