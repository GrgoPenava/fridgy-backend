import { prisma } from "../../config/database";
import logger from "../../utils/logger";
import { Response } from "../../types";

export async function createRole(name: string): Promise<Response> {
  try {
    const role = await prisma.role.create({
      data: { name },
    });

    logger.info({ roleId: role.id }, "Uloga kreirana");
    return {
      message: "Uloga uspješno kreirana",
      code: 201,
      data: role,
    };
  } catch (error) {
    logger.error({ error, name }, "Greška pri kreiranju uloge");
    return {
      message: "Greška pri kreiranju uloge",
      code: 500,
    };
  }
}

export async function updateRole(id: number, name: string): Promise<Response> {
  try {
    const role = await prisma.role.update({
      where: { id },
      data: { name },
    });

    logger.info({ roleId: id }, "Uloga ažurirana");
    return {
      message: "Uloga uspješno ažurirana",
      code: 200,
      data: role,
    };
  } catch (error) {
    logger.error({ error, id }, "Greška pri ažuriranju uloge");
    return {
      message: "Greška pri ažuriranju uloge",
      code: 500,
    };
  }
}

export async function getRole(id: number): Promise<Response> {
  try {
    const role = await prisma.role.findUnique({
      where: { id },
      include: { users: true },
    });

    if (!role) {
      logger.warn({ id }, "Uloga nije pronađena");
      return {
        message: "Uloga nije pronađena",
        code: 404,
      };
    }

    logger.info({ roleId: id }, "Uloga dohvaćena");
    return {
      message: "Uloga uspješno dohvaćena",
      code: 200,
      data: role,
    };
  } catch (error) {
    logger.error({ error, id }, "Greška pri dohvaćanju uloge");
    return {
      message: "Greška pri dohvaćanju uloge",
      code: 500,
    };
  }
}

export async function getAllRoles(): Promise<Response> {
  try {
    const roles = await prisma.role.findMany({
      include: { users: true },
    });

    logger.info("Sve uloge dohvaćene");
    return {
      message: "Uloge uspješno dohvaćene",
      code: 200,
      data: roles,
    };
  } catch (error) {
    logger.error({ error }, "Greška pri dohvaćanju uloga");
    return {
      message: "Greška pri dohvaćanju uloga",
      code: 500,
    };
  }
}

export async function deleteRole(id: number): Promise<Response> {
  try {
    await prisma.role.delete({
      where: { id },
    });

    logger.info({ roleId: id }, "Uloga obrisana");
    return {
      message: "Uloga uspješno obrisana",
      code: 200,
    };
  } catch (error) {
    logger.error({ error, id }, "Greška pri brisanju uloge");
    return {
      message: "Greška pri brisanju uloge",
      code: 500,
    };
  }
}
