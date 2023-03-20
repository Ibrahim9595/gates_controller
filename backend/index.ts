import express from "express";
import bodyParser from "body-parser";
import { errorHandlerMiddleware } from "./src/utils/error-handler-middleware";
import { gatewayRouter } from "./src/services/gateways";
var cors = require("cors");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/gateways", gatewayRouter);
app.use(errorHandlerMiddleware);

app.get("/health", (_, res) => res.json({ success: true }));

const port = process.env.PORT || 5400;
app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});

// TODO: Convert peripherals.id to number
// TODO: Add Unit tests
// TODO: Create a simple react app
