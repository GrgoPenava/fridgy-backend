import Fastify from "fastify";
import cors from "@fastify/cors";
import pino from "pino"; // Uvoz pino za ručnu instancu
import { loggerConfig } from "./utils/logger"; // Uvoz konfiguracije
import { configureSwagger } from "./config/swagger";
import { authRoutes } from "./modules/auth/routes";
import { fridgeRoutes } from "./modules/fridge/routes";
import { productRoutes } from "./modules/product/routes";
import jwt from "@fastify/jwt";
import { usersRoutes } from "./modules/user/routes";

// Kreiraj Fastify instancu s konfiguriranim loggerom
const app = Fastify({ logger: loggerConfig });

// Kreiraj zasebnu instancu loggera za ručno logiranje
const logger = pino(loggerConfig);

// Middleware i konfiguracija
app.register(jwt, {
  secret: process.env.JWT_SECRET || "your-secret-key",
});
app.register(cors, { origin: "*" });
configureSwagger(app);

// Registracija modula
app.register(authRoutes, { prefix: "/auth" });
app.register(fridgeRoutes);
app.register(productRoutes);
app.register(usersRoutes);

// Test ruta
app.get("/", async () => {
  logger.info("Test ruta je pozvana");
  return { message: "Fastify radi!" };
});

// Pokretanje servera
const start = async () => {
  try {
    await app.listen({ port: 3000, host: "0.0.0.0" });
    logger.info("Server radi na http://localhost:3000");
  } catch (err) {
    logger.error({ err }, "Greška pri pokretanju servera");
    process.exit(1);
  }
};

start();
