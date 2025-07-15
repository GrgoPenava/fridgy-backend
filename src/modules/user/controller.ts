import { FastifyRequest, FastifyReply } from "fastify";
import { deleteUser, getUser, getUsers } from "./service";

export async function getAllUsers(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const response = await getUsers();
  reply.status(response.code).send(response.data);
}

export async function getUserById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const id = Number(request.params.id);

  if (isNaN(id)) {
    return reply.status(400).send({ message: "Invalid user ID" });
  }

  const response = await getUser(id);
  return reply.status(response.code).send(response);
}

export async function deleteUserById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const id = Number(request.params.id);

  if (isNaN(id)) {
    return reply.status(400).send({ message: "Neispravan ID usera" });
  }

  const response = await deleteUser(id);
  return reply.status(response.code).send(response);
}
