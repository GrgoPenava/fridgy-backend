import { FastifyInstance } from "fastify";
import { deleteUserById, getAllUsers, getUserById } from "./controller";
import { deleteUserSchema, userSchema, usersSchema } from "./schema";
import { authenticate } from "../../middleware/auth";

export async function usersRoutes(app: FastifyInstance) {
  app.get("", { schema: { ...usersSchema, tags: ["User"] } }, getAllUsers);
  //app.post("/user", { schema: usersSchema }, addUserToFridgeController);
  /* app.get<{
    Params: { id: string };
  }>(
    "/user/:id",
    { schema: getFridgeSchema, preHandler: authenticate },
    getFridgeController
  ); */

  app.get<{ Params: { id: string } }>(
    "/user/:id",
    {
      schema: {
        ...userSchema,
        tags: ["User"],
      },
      preHandler: authenticate,
    },
    getUserById
  );

  app.delete<{ Params: { id: string } }>(
    "/:id",
    {
      schema: {
        ...deleteUserSchema,
        tags: ["User"],
      },
      preHandler: authenticate,
    },
    deleteUserById
  );
}
