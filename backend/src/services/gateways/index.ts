import { Router } from "express";
import { createController } from "../../utils";
import { createGateWayScheme, handler as createGateWayHandler } from "./create";
import { deleteGateWayScheme, handler as deleteGateWayHandler } from "./delete";
import { handler as listGateWaysHandler, listGateWaysScheme } from "./list";
import { peripheralRouter } from "./peripherals";
import { showGateWaysScheme, handler as showGateWaysHandler } from "./show";
import { handler as updateGateWayHandler, updateGateWayScheme } from "./update";

export const gatewayRouter = Router();
gatewayRouter.get(
  "/",
  createController({
    argsParser: listGateWaysScheme,
    handler: listGateWaysHandler,
  })
);

gatewayRouter.get(
  "/:id",
  createController({
    argsParser: showGateWaysScheme,
    handler: showGateWaysHandler,
  })
);

gatewayRouter.post(
  "/",
  createController({
    argsParser: createGateWayScheme,
    handler: createGateWayHandler,
  })
);

gatewayRouter.put(
  "/:id",
  createController({
    argsParser: updateGateWayScheme,
    handler: updateGateWayHandler,
  })
);

gatewayRouter.delete(
  "/:id",
  createController({
    argsParser: deleteGateWayScheme,
    handler: deleteGateWayHandler,
  })
);

gatewayRouter.use("/:gatewayId/peripherals", peripheralRouter);
