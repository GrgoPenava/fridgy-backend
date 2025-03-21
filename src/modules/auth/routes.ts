import { FastifyInstance } from "fastify";
import { register, login } from "./controller";
import { registerSchema, loginSchema } from "./schema";

export async function authRoutes(app: FastifyInstance) {
  app.post(
    "/register",
    { schema: { ...registerSchema, tags: ["Auth"] } },
    register
  );
  app.post("/login", { schema: { ...loginSchema, tags: ["Auth"] } }, login);
}
