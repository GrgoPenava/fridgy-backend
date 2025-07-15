import { FastifyInstance } from "fastify";
import {
  createRoleController,
  updateRoleController,
  getRoleController,
  getAllRolesController,
  deleteRoleController,
} from "./controller";
import {
  createRoleSchema,
  updateRoleSchema,
  getRoleSchema,
  getAllRolesSchema,
  deleteRoleSchema,
} from "./schema";
import { authenticate } from "../../middleware/auth";

export async function roleRoutes(app: FastifyInstance) {
  app.post<{
    Body: { name: string };
  }>(
    "",
    {
      schema: {
        ...createRoleSchema,
        tags: ["Roles"],
      },
      preHandler: authenticate,
    },
    createRoleController
  );

  app.put<{ Params: { id: string }; Body: { name: string } }>(
    "/:id",
    {
      schema: {
        ...updateRoleSchema,
        tags: ["Roles"],
      },
      preHandler: authenticate,
    },
    updateRoleController
  );

  app.get<{ Params: { id: string } }>(
    "/roles/:id",
    {
      schema: {
        ...getRoleSchema,
        tags: ["Roles"],
      },
      preHandler: authenticate,
    },
    getRoleController
  );

  app.get(
    "",
    {
      schema: {
        ...getAllRolesSchema,
        tags: ["Roles"],
      },
      preHandler: authenticate,
    },
    getAllRolesController
  );

  app.delete<{ Params: { id: string } }>(
    "/:id",
    {
      schema: {
        ...deleteRoleSchema,
        tags: ["Roles"],
      },
      preHandler: authenticate,
    },
    deleteRoleController
  );
}
