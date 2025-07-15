import { FastifyReply, FastifyRequest } from "fastify";
import { registerUser, loginUser } from "./service";
import { User } from "@prisma/client";
import { LoginRequest, RegisterRequest, UserWithRole } from "../../types";

export async function register(
  request: FastifyRequest<{
    Body: RegisterRequest;
  }>,
  reply: FastifyReply
) {
  try {
    const registerRequest = request.body;
    const user = await registerUser(registerRequest);
    reply.status(201).send({
      message: "User created successfully",
      user: {
        id: user.id,
        email: user.email,
        role: user.role.name,
        username: user.username,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Email already exists") {
        return reply.status(409).send({ error: "Email already exists" });
      }
      if (error.message === "Username already exists") {
        return reply.status(409).send({ error: "Username already exists" });
      }
    }
    request.log.error(error);
    reply.status(500).send({ error: "Internal server error" });
  }
}

export async function login(
  request: FastifyRequest<{ Body: LoginRequest }>,
  reply: FastifyReply
) {
  try {
    const loginRequest = request.body;
    const { user, token } = await loginUser(loginRequest, request.server);

    reply.send({
      message: "Login successful",
      accessToken: token,
      user: { id: user.id, email: user.email, role: user.role.name },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Invalid email or password"
    ) {
      return reply.status(401).send({ error: error.message });
    }
    request.log.error(error);
    reply.status(500).send({ error: "Internal server error" });
  }
}
