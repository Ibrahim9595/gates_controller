import { getPrismaClient } from "../../../../utils";
import { DeletePeripheralsScheme } from "./validation";

export const handler = async ({ params: { id } }: DeletePeripheralsScheme) => {
  const prisma = getPrismaClient();
  return prisma.peripheral.delete({
    where: { id },
  });
};
