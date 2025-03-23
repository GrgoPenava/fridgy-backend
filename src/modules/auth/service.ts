import { prisma } from "../../config/database";
import { LoginRequest, RegisterRequest, UserWithRole } from "../../types";
import { hashPassword, comparePassword } from "../../utils/hash";
import { Prisma, User } from "@prisma/client";
import { FastifyInstance } from "fastify";

export async function registerUser(
  registerRequest: RegisterRequest
): Promise<UserWithRole> {
  const hashedPassword = await hashPassword(registerRequest.password);
  try {
    const user = await prisma.user.create({
      data: {
        email: registerRequest.email,
        username: registerRequest.username,
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
        username: user.username,
        name: user.role.name,
      },
    } as UserWithRole;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const target = error.meta?.target as string[];
      if (target?.includes("email")) {
        throw new Error("Email already exists");
      }
      if (target?.includes("username")) {
        throw new Error("Username already exists");
      }
    }
    throw error;
  }
}

export async function loginUser(
  loginRequest: LoginRequest,
  fastify: FastifyInstance
): Promise<{ user: UserWithRole; token: string }> {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: loginRequest.email }, { username: loginRequest.username }],
    },
    include: { role: true },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await comparePassword(
    loginRequest.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = fastify.jwt.sign(
    { id: user.id, email: user.email },
    { expiresIn: "1h" }
  );

  return {
    user: {
      ...user,
      role: {
        id: user.role.id,
        name: user.role.name,
        username: user.username,
      },
    } as UserWithRole,
    token,
  };
}
