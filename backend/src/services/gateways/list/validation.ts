import { z } from "zod";

export const listGateWaysScheme = z.object({});

export type ListGateWaysScheme = z.infer<typeof listGateWaysScheme>;
