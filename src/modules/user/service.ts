import { prisma } from "../../config/database";
import logger from "../../utils/logger";
import { Response } from "../../types";

export async function getUsers(): Promise<Response> {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
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
