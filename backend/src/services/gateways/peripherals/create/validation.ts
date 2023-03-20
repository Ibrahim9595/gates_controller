import { z } from "zod";

export const createPeripheralsScheme = z.object({
  body: z.object({
    vendor: z.string(),
    status: z.enum(["online", "offline"]),
  }),
  params: z.object({
    gatewayId: z.string(),
  }),
});

export type CreatePeripheralsScheme = z.infer<typeof createPeripheralsScheme>;
