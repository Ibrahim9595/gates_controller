import { getPrismaClient } from "../../../../utils";
import { UpdatePeripheralsScheme } from "./validation";

export const handler = ({
  body: data,
  params: { id },
}: UpdatePeripheralsScheme) => {
  const prisma = getPrismaClient();
  return prisma.peripheral.update({
    data,
    where: { id },
  });
};
