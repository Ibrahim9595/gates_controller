import createHttpError from "http-errors";
import { getPrismaClient } from "../../../utils";
import { UpdateGateWayScheme } from "./validation";

export const handler = ({
  body: data,
  params: { id },
}: UpdateGateWayScheme) => {
  const prisma = getPrismaClient();
  return prisma.gateway
    .update({
      data,
      where: { id },
    })
    .catch((err) => {
      throw createHttpError.BadRequest(
        err?.meta?.target?.toUpperCase() || "UNKNOWN_ERROR"
      );
    });
};
