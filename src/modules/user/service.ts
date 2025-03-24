import { prisma } from "../../config/database";
import logger from "../../utils/logger";
import { Response } from "../../types";

export async function getUsers(): Promise<Response> {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        fridges: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!users) {
      logger.warn("Users not found");
      return {
        message: "Users not found",
        code: 404,
      };
    }

    logger.info("Get users");
    return {
      message: "Users fetched",
      code: 200,
      data: users,
    };
  } catch (error) {
    logger.error({ error }, "Greška pri dohvaćanju korisnika");
    return {
      message: "Greška pri dohvaćanju korisnika",
      code: 500,
    };
  }
}

export async function getUser(id: number): Promise<Response> {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        fridges: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!user) {
      logger.warn({ id }, "User nije pronađen");
      return {
        message: "User nije pronađen",
        code: 404,
      };
    }

    logger.info({ userId: id }, "User dohvaćen");
    console.log("DADADADADADA -", user);

    return {
      message: "User uspješno dohvaćen",
      code: 200,
      data: user,
    };
  } catch (error) {
    logger.error({ error, id }, "Greška pri dohvaćanju usera");
    return {
      message: "Greška pri dohvaćanju usera",
      code: 500,
    };
  }
}

export async function deleteUser(id: number): Promise<Response> {
  try {
    const user = await prisma.user.delete({
      where: { id },
      select: {
        username: true,
        email: true,
        id: true,
      },
    });

    logger.info({ userId: id }, "User obrisan");
    return {
      message: "User uspješno obrisan",
      code: 200,
      data: user,
    };
  } catch (error) {
    logger.error({ error, id }, "Greška pri brisanju usera");
    return {
      message: "Greška pri brisanju usera",
      code: 500,
    };
  }
}
