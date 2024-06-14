import express from 'express';
import { loggingFunction } from './middleware/loggingHandler.js';
import cors from 'cors';
import { routeNotFound } from './middleware/routeNotFound.js';
import favicon from 'serve-favicon';
import path from 'path';
export const app = express();

const faviconPath = path.resolve(import.meta.dirname, '..', 'public', 'images', 'favicon.ico');

app.use(favicon(faviconPath));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '24kb' }));
app.use(express.static('public'));
app.use(loggingFunction);
app.use(cors());

app.get('/healthCheck', (req, res, next) => {
    return res.status(200).json({ message: 'Server is Healthy 💪💚🥗🧘‍♀️🥗🍎🌱🔆' });
});
app.use(routeNotFound);
