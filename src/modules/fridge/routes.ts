import { FastifyInstance } from "fastify";
import {
  createFridgeController,
  addUserToFridgeController,
  getFridgeController,
} from "./controller";
import {
  createFridgeSchema,
  addUserToFridgeSchema,
  getFridgeSchema,
} from "./schema";
import { authenticate } from "../../middleware/auth";

export async function fridgeRoutes(app: FastifyInstance) {
  app.post(
    "",
    {
      schema: {
        ...createFridgeSchema,
        tags: ["Fridge"],
      },
    },
    createFridgeController
  );
  app.post(
    "/add-user",
    {
      schema: {
        ...addUserToFridgeSchema,
        tags: ["Fridge"],
      },
    },
    addUserToFridgeController
  );
  app.get<{
    Params: { id: string };
  }>(
    "/:id",
    {
      schema: {
        ...getFridgeSchema,
        tags: ["Fridge"],
      },
      preHandler: authenticate,
    },
    getFridgeController
  );
}
