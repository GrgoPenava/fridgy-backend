import { FastifyRequest, FastifyReply } from "fastify";
import { getUsers } from "./service";

export async function getAllUsers(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const response = await getUsers();
  reply.status(response.code).send(response.data);
}
