import { PrismaClient } from "@prisma/client";

const _getPrismaClient = () => {
  let prisma: PrismaClient | null = null;

  return () => {
    if (prisma === null) prisma = new PrismaClient();
    return prisma;
  };
};

export const getPrismaClient = _getPrismaClient();
