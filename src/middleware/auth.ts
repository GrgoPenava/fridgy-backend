import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";
import { prisma } from "../config/database";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) {
  const authHeader = request.headers.authorization;

  // Provjeri postoji li Authorization header i je li u formatu "Bearer <token>"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return reply.status(401).send({
      error: "Unauthorized",
      message: "Missing or invalid Authorization header",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verificiraj JWT token
    const decoded = await request.jwtVerify<{ id: number; email: string }>();

    // Pronađi korisnika u bazi na temelju ID-a iz tokena
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return reply.status(401).send({
        error: "Unauthorized",
        message: "User not found",
      });
    }

    // Dodaj korisnika u request objekt
    request.user = user;
    done(); // Nastavi s obradom rute
  } catch (error) {
    return reply.status(401).send({
      error: "Unauthorized",
      message: "Invalid or expired token",
    });
  }
}

// Proširi Fastify tipove kako bi request.user bio prepoznat
declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
    };
  }
}
