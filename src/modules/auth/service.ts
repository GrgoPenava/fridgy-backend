import { prisma } from "../../config/database";
import { hashPassword, comparePassword } from "../../utils/hash";
import { Prisma, User } from "@prisma/client";
import { FastifyInstance } from "fastify";

export async function registerUser(
  email: string,
  password: string
): Promise<User> {
  const hashedPassword = await hashPassword(password);
  try {
    return await prisma.user.create({
      data: { email, password: hashedPassword },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new Error("Email already exists");
    }
    throw error;
  }
}

export async function loginUser(
  email: string,
  password: string,
  fastify: FastifyInstance
): Promise<{ user: User; token: string }> {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Generiraj JWT token
  const token = fastify.jwt.sign(
    { id: user.id, email: user.email },
    { expiresIn: "1h" } // Token ističe za 1 sat
  );

  return { user, token };
}
