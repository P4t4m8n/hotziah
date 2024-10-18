import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function purgeDB() {
  await prisma.$executeRaw`TRUNCATE TABLE "Post", "Comment", "Forum", "User" RESTART IDENTITY CASCADE`;

  console.info("All data truncated.");
}
