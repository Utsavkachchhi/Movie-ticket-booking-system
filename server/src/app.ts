import express from 'express';
import { loggingFunction } from './middleware/loggingHandler.js';
import cors from 'cors';
import { routeNotFound } from './middleware/routeNotFound.js';
import favicon from 'serve-favicon';
import path from 'path';
import router from './routes/index.js';
import { prisma } from './Model/index.js';
import cookieParser from 'cookie-parser';
export const app = express();

const faviconPath = path.resolve(import.meta.dirname, '..', 'public', 'images', 'favicon.ico');

async function main() {
    await prisma.$connect();
    console.log('connected');
}
main();
// .then(async () => {
//     await prisma.$disconnect();
// })
// .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
// });

app.use(favicon(faviconPath));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '24kb' }));
app.use(express.static('public'));
app.use(loggingFunction);
app.use(cors());
app.use(cookieParser());

app.use('/api/v1', router);

app.get('/healthCheck', (req, res, next) => {
    return res.status(200).json({ message: 'Server is Healthy 💪💚🥗🧘‍♀️🥗🍎🌱🔆' });
});
app.use(routeNotFound);
