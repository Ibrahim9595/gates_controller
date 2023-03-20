import { z } from "zod";
import { IPV4_REGEX } from "../utils";

export const updateGateWayScheme = z.object({
  body: z.object({
    name: z.string().optional(),
    ipv4: z.string().regex(IPV4_REGEX).optional(),
  }),
  params: z.object({
    id: z.string(),
  }),
});

export type UpdateGateWayScheme = z.infer<typeof updateGateWayScheme>;
