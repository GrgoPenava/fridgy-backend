import pino from "pino";
import * as dotenv from "dotenv";

dotenv.config();

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

const logger = pino(loggerConfig);
export default logger;
