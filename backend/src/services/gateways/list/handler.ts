import { getPrismaClient } from "../../../utils";

export const handler = () => {
  const prisma = getPrismaClient();
  return prisma.gateway.findMany({
    include: {
      peripheral: {
        select: { id: true, status: true },
      },
    },
  });
};
