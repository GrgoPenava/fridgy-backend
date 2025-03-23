import { FastifyRequest, FastifyReply } from "fastify";
import { addProductByBarcode, getProduct } from "./service";

export async function addProductController(
  request: FastifyRequest<{ Body: { barcode: string; fridgeId: number } }>,
  reply: FastifyReply
) {
  const { barcode, fridgeId } = request.body;

  const userId = request.user.id;
  const response = await addProductByBarcode(barcode, fridgeId, userId);
  reply.status(response.code).send(response);
}

export async function getProductController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const productId = Number(request.params.id);
  if (isNaN(productId)) {
    return reply.status(400).send({ message: "Product ID not valid" });
  }
  const response = await getProduct(productId);
  return reply.status(response.code).send(response);
}
