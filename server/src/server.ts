import { app } from './app.js';
import { Server } from './config/config.js';
import http from 'http';

const httpServer = http.createServer(app);

httpServer.listen(Server.SERVER_PORT, () => {
    console.log(`⚙️ Server is running ${Server.ENVIRONMENT} Environment`);
    console.log(`⚙️ Server is running on port ${Server.SERVER_PORT} 🚀`);
    console.log(`App is running on process is ${process.pid}`);
});

export const SHUTDOWN = (callback: any) => httpServer && httpServer.close(callback);
