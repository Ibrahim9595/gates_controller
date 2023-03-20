import { z } from "zod";

export const deleteGateWayScheme = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export type DeleteGateWayScheme = z.infer<typeof deleteGateWayScheme>;
