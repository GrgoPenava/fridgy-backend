import { FastifyRequest, FastifyReply } from "fastify";
import {
  createRole,
  updateRole,
  getRole,
  getAllRoles,
  deleteRole,
} from "./service";

export async function createRoleController(
  request: FastifyRequest<{ Body: { name: string } }>,
  reply: FastifyReply
) {
  const { name } = request.body;
  const response = await createRole(name);
  reply.status(response.code).send(response);
}

export async function updateRoleController(
  request: FastifyRequest<{
    Params: { id: string };
    Body: { name: string };
  }>,
  reply: FastifyReply
) {
  const id = Number(request.params.id);
  const { name } = request.body;

  if (isNaN(id)) {
    return reply.status(400).send({ message: "Neispravan ID uloge" });
  }

  const response = await updateRole(id, name);
  return reply.status(response.code).send(response);
}

export async function getRoleController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const id = Number(request.params.id);

  if (isNaN(id)) {
    return reply.status(400).send({ message: "Neispravan ID uloge" });
  }

  const response = await getRole(id);
  return reply.status(response.code).send(response);
}

export async function getAllRolesController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const response = await getAllRoles();
  return reply.status(response.code).send(response);
}

export async function deleteRoleController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const id = Number(request.params.id);

  if (isNaN(id)) {
    return reply.status(400).send({ message: "Neispravan ID uloge" });
  }

  const response = await deleteRole(id);
  return reply.status(response.code).send(response);
}
