import { FastifyInstance } from "fastify";
import { getAllUsers } from "./controller";
import { usersSchema } from "./schema";
import { authenticate } from "../../middleware/auth";

export async function usersRoutes(app: FastifyInstance) {
  app.get("/user", { schema: { ...usersSchema, tags: ["User"] } }, getAllUsers);
  //app.post("/user", { schema: usersSchema }, addUserToFridgeController);
  /* app.get<{
    Params: { id: string };
  }>(
    "/user/:id",
    { schema: getFridgeSchema, preHandler: authenticate },
    getFridgeController
  ); */
}
