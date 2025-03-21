import { FastifyInstance } from "fastify";
import { addProductController, getProductController } from "./controller";
import { addProductSchema, getProductSchema } from "./schema";
import { authenticate } from "../../middleware/auth";

export async function productRoutes(app: FastifyInstance) {
  app.post(
    "/products",
    { schema: { ...addProductSchema, tags: ["Product"] } },
    addProductController
  );
  app.get<{ Params: { id: string } }>(
    "/products/:id",
    {
      schema: { ...getProductSchema, tags: ["Product"] },
      preHandler: authenticate,
    },
    getProductController
  );
}
