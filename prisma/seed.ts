import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const basicRole = await prisma.role.findUnique({ where: { name: "basic" } });
  if (!basicRole) {
    await prisma.role.create({
      data: { name: "basic" },
    });
  }

  const adminRole = await prisma.role.findUnique({ where: { name: "admin" } });
  if (!adminRole) {
    await prisma.role.create({
      data: { name: "admin" },
    });
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
