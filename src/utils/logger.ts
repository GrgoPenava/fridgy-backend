import pino from "pino";
import * as dotenv from "dotenv";

dotenv.config(); // Učitaj .env datoteku

// Konfiguracija za Pino logger
export const loggerConfig = {
  level: process.env.LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
      ignore: "pid,hostname",
    },
  },
};

// Kreiraj i izvozi instancu loggera
const logger = pino(loggerConfig);
export default logger;
