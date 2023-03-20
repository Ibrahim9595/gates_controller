import { z } from "zod";

export const updatePeripheralsScheme = z.object({
  body: z.object({
    vendor: z.string(),
    status: z.enum(["online", "offline"]),
  }),
  params: z.object({
    id: z.string(),
    gatewayId: z.string(),
  }),
});

export type UpdatePeripheralsScheme = z.infer<typeof updatePeripheralsScheme>;
