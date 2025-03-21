import { FastifyRequest, FastifyReply } from "fastify";
import { createFridge, addUserToFridge, getFridge } from "./service";

export async function createFridgeController(
  request: FastifyRequest<{ Body: { name: string; userId: number } }>,
  reply: FastifyReply
) {
  const { name, userId } = request.body;
  const response = await createFridge(name, userId);
  reply.status(response.code).send(response);
}

export async function addUserToFridgeController(
  request: FastifyRequest<{ Body: { fridgeId: number; userId: number } }>,
  reply: FastifyReply
) {
  const { fridgeId, userId } = request.body;
  const response = await addUserToFridge(fridgeId, userId);
  reply.status(response.code).send(response);
}

export async function getFridgeController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const fridgeId = Number(request.params.id); // Osiguraj brojčanu konverziju
  if (isNaN(fridgeId)) {
    return reply.status(400).send({ message: "Neispravan ID frižidera" });
  }

  const response = await getFridge(fridgeId);
  reply.status(response.code).send(response);
}
