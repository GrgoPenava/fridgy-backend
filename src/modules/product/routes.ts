import { FastifyInstance } from "fastify";
import { addProductController, getProductController } from "./controller";
import { addProductSchema, getProductSchema } from "./schema";
import { authenticate } from "../../middleware/auth";

export async function productRoutes(app: FastifyInstance) {
  app.post<{
    Body: { barcode: string; fridgeId: number };
  }>(
    "",
    {
      schema: { ...addProductSchema, tags: ["Product"] },
      preHandler: authenticate,
    },
    addProductController
  );
  app.get<{ Params: { id: string } }>(
    "/:id",
    {
      schema: { ...getProductSchema, tags: ["Product"] },
      preHandler: authenticate,
    },
    getProductController
  );
}
