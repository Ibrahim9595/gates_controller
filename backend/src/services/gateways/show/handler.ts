import { getPrismaClient } from "../../../utils";
import { ShowGateWaysScheme } from "./validation";

export const handler = ({ params: { id } }: ShowGateWaysScheme) => {
  const prisma = getPrismaClient();
  return prisma.gateway.findFirst({
    where: { id },
    include: {
      peripheral: true,
    },
  });
};
