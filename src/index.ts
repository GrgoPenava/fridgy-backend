import Fastify from "fastify";
import cors from "@fastify/cors";
import pino from "pino";
import { loggerConfig } from "./utils/logger";
import { configureSwagger } from "./config/swagger";
import { authRoutes } from "./modules/auth/routes";
import { fridgeRoutes } from "./modules/fridge/routes";
import { productRoutes } from "./modules/product/routes";
import jwt from "@fastify/jwt";
import { usersRoutes } from "./modules/user/routes";
import { roleRoutes } from "./modules/role/routes";

const app = Fastify({ logger: loggerConfig });

const logger = pino(loggerConfig);

app.register(jwt, {
  secret: process.env.JWT_SECRET || "your-secret-key",
});
app.register(cors, { origin: "*" });
configureSwagger(app);

app.register(authRoutes, { prefix: "api/v1/auth" });
app.register(fridgeRoutes, { prefix: "api/v1/fridge" });
app.register(productRoutes, { prefix: "api/v1/product" });
app.register(usersRoutes, { prefix: "api/v1/users" });
app.register(roleRoutes, { prefix: "api/v1/role" });

app.get("/", async () => {
  logger.info("Test ruta je pozvana");
  return { message: "Fastify radi!" };
});

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
