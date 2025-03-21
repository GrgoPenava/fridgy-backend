import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";
import { prisma } from "../config/database";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return reply.status(401).send({
      error: "Unauthorized",
      message: "Missing or invalid Authorization header",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await request.jwtVerify<{ id: number; email: string }>();

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return reply.status(401).send({
        error: "Unauthorized",
        message: "User not found",
      });
    }

    request.user = user;
  } catch (error) {
    return reply.status(401).send({
      error: "Unauthorized",
      message: "Invalid or expired token",
    });
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
    };
  }
}
