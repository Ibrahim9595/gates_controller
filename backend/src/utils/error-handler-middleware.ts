import { ErrorRequestHandler } from "express";

export const errorHandlerMiddleware: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message,
  });
};
