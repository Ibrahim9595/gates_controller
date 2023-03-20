import createHttpError from "http-errors";
import { getPrismaClient } from "../../../utils";
import { CreateGateWayScheme } from "./validation";

export const handler = ({ body: data }: CreateGateWayScheme) => {
  const prisma = getPrismaClient();
  return prisma.gateway
    .create({
      data,
    })
    .catch((err) => {
      throw createHttpError.BadRequest(
        err?.meta?.target?.toUpperCase() || "UNKNOWN_ERROR"
      );
    });
};
