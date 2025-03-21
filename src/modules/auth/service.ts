import { prisma } from "../../config/database";
import { UserWithRole } from "../../types";
import { hashPassword, comparePassword } from "../../utils/hash";
import { Prisma, User } from "@prisma/client";
import { FastifyInstance } from "fastify";

export async function registerUser(
  email: string,
  password: string
): Promise<UserWithRole> {
  const hashedPassword = await hashPassword(password);
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: {
          connectOrCreate: {
            where: { name: "basic" },
            create: { name: "basic" },
          },
        },
      },
      include: { role: true },
    });

    if (!user.role) {
      throw new Error("User role assignment failed");
    }
    return {
      ...user,
      role: {
        id: user.role.id,
        name: user.role.name,
      },
    } as UserWithRole;
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
): Promise<{ user: UserWithRole; token: string }> {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { role: true },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = fastify.jwt.sign(
    { id: user.id, email: user.email },
    { expiresIn: "1h" }
  );

  return { user: user as UserWithRole, token };
}
