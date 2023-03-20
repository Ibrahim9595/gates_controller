import createHttpError from "http-errors";
import { getPrismaClient } from "../../../../utils";
import { CreatePeripheralsScheme } from "./validation";

const MAX_PERIPHERALS_FOR_GATEWAY = 10;

export const handler = async ({
  body: data,
  params: { gatewayId },
}: CreatePeripheralsScheme) => {
  const prisma = getPrismaClient();
  const peripheralCount = await prisma.peripheral.count({
    where: {
      gatewayId,
    },
  });
  if (peripheralCount >= MAX_PERIPHERALS_FOR_GATEWAY)
    throw createHttpError.BadRequest("MAX_PERIPHERALS_FOR_GATEWAY_REACHED");
  return prisma.peripheral.create({
    data: {
      ...data,
      gatewayId,
    },
  });
};
