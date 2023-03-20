import { z } from "zod";

export const showGateWaysScheme = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export type ShowGateWaysScheme = z.infer<typeof showGateWaysScheme>;
