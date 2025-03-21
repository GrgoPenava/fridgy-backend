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
  app.post(
    "/roles",
    {
      schema: {
        ...createRoleSchema,
        tags: ["Roles"],
      },
      preHandler: [authenticate],
    },
    createRoleController
  );

  app.put(
    "/roles/:id",
    {
      schema: {
        ...updateRoleSchema,
        tags: ["Roles"],
      },
      preHandler: [authenticate],
    },
    updateRoleController
  );

  app.get(
    "/roles/:id",
    {
      schema: {
        ...getRoleSchema,
        tags: ["Roles"],
      },
      preHandler: [authenticate],
    },
    getRoleController
  );

  app.get(
    "/roles",
    {
      schema: {
        ...getAllRolesSchema,
        tags: ["Roles"],
      },
      preHandler: [authenticate],
    },
    getAllRolesController
  );

  app.delete(
    "/roles/:id",
    {
      schema: {
        ...deleteRoleSchema,
        tags: ["Roles"],
      },
      preHandler: [authenticate],
    },
    deleteRoleController
  );
}
