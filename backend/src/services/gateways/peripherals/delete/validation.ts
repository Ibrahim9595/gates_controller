import { z } from "zod";

export const deletePeripheralsScheme = z.object({
  params: z.object({
    id: z.string(),
    gatewayId: z.string(),
  }),
});

export type DeletePeripheralsScheme = z.infer<typeof deletePeripheralsScheme>;
