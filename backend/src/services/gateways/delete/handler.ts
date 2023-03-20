import { getPrismaClient } from "../../../utils";
import { DeleteGateWayScheme } from "./validation";

export const handler = ({ params: { id } }: DeleteGateWayScheme) => {
  const prisma = getPrismaClient();
  return prisma.gateway
    .delete({
      where: { id },
    })
    .then(() => {
      return prisma.peripheral.deleteMany({ where: { gatewayId: id } });
    });
};
