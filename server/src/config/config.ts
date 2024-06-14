import dotenv from "dotenv"
import path from "path";

// ENV File Setup
const envUrl = process.env.NODE_ENV
  ? path.resolve(import.meta.dirname,'..','..', `.env.${process.env.NODE_ENV}`)
  : path.resolve(import.meta.dirname,'..','..', `.env`);

dotenv.config({
  path: envUrl,
});

const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 4123

export const Server = {
    SERVER_PORT
}