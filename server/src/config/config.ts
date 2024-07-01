import dotenv from 'dotenv';

dotenv.config();

const ENVIRONMENT = process.env.NODE_ENV || 'development';
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 4123;

export const Server = {
    SERVER_PORT,
    ENVIRONMENT
};
