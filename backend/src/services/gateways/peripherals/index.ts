import { Router } from "express";
import { createController } from "../../../utils";
import {
  createPeripheralsScheme,
  handler as createPeripheralsHandler,
} from "./create";
import {
  deletePeripheralsScheme,
  handler as deletePeripheralsHandler,
} from "./delete";
import {
  handler as updatePeripheralsHandler,
  updatePeripheralsScheme,
} from "./update";

export const peripheralRouter = Router({ mergeParams: true });

peripheralRouter.post(
  "/",
  createController({
    argsParser: createPeripheralsScheme,
    handler: createPeripheralsHandler,
  })
);

peripheralRouter.put(
  "/:id",
  createController({
    argsParser: updatePeripheralsScheme,
    handler: updatePeripheralsHandler,
  })
);

peripheralRouter.delete(
  "/:id",
  createController({
    argsParser: deletePeripheralsScheme,
    handler: deletePeripheralsHandler,
  })
);
