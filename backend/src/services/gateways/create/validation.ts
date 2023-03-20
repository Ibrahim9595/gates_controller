import { z } from "zod";

export const createGateWayScheme = z.object({
  body: z.object({
    name: z.string(),
    ipv4: z.string().regex(/(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/)
  }),
});

export type CreateGateWayScheme = z.infer<typeof createGateWayScheme>;
