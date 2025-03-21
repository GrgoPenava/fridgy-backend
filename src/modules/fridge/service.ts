import { prisma } from "../../config/database";
import logger from "../../utils/logger";
import { Response } from "../../types";

export async function createFridge(
  name: string,
  userId: number
): Promise<Response> {
  try {
    const fridge = await prisma.fridge.create({
      data: {
        name,
        users: {
          connect: { id: userId },
        },
        createdById: userId,
      },
    });
    logger.info({ fridgeId: fridge.id, userId }, "Frižider kreiran");
    return {
      message: "Frižider uspješno kreiran",
      code: 201,
      data: fridge,
    };
  } catch (error) {
    logger.error({ error, userId }, "Greška pri kreiranju frižidera");
    return {
      message: "Greška pri kreiranju frižidera",
      code: 500,
    };
  }
}

export async function addUserToFridge(
  fridgeId: number,
  userId: number
): Promise<Response> {
  try {
    const fridge = await prisma.fridge.findUnique({ where: { id: fridgeId } });
    if (!fridge) {
      logger.warn({ fridgeId }, "Frižider nije pronađen");
      return {
        message: "Frižider nije pronađen",
        code: 404,
      };
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      logger.warn({ userId }, "Korisnik nije pronađen");
      return {
        message: "Korisnik nije pronađen",
        code: 404,
      };
    }

    const updatedFridge = await prisma.fridge.update({
      where: { id: fridgeId },
      data: {
        users: {
          connect: { id: userId },
        },
      },
      include: { users: true },
    });

    logger.info({ fridgeId, userId }, "Korisnik dodan u frižider");
    return {
      message: "Korisnik uspješno dodan u frižider",
      code: 200,
      data: updatedFridge,
    };
  } catch (error) {
    logger.error({ error, fridgeId, userId }, "Greška pri dodavanju korisnika");
    return {
      message: "Greška pri dodavanju korisnika u frižider",
      code: 500,
    };
  }
}

export async function getFridge(fridgeId: number): Promise<Response> {
  try {
    const fridge = await prisma.fridge.findUnique({
      where: { id: fridgeId },
      include: { users: true, products: true },
    });

    if (!fridge) {
      logger.warn({ fridgeId }, "Frižider nije pronađen");
      return {
        message: "Frižider nije pronađen",
        code: 404,
      };
    }

    logger.info({ fridgeId }, "Frižider dohvaćen");
    return {
      message: "Frižider uspješno dohvaćen",
      code: 200,
      data: fridge,
    };
  } catch (error) {
    logger.error({ error, fridgeId }, "Greška pri dohvaćanju frižidera");
    return {
      message: "Greška pri dohvaćanju frižidera",
      code: 500,
    };
  }
}
