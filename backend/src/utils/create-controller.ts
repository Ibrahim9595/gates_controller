import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { SafeParseSuccess, z } from "zod";

type ControllerArgs = {
  argsParser: z.ZodObject<any> | z.ZodEffects<any>;
  handler: (args: any) => Promise<any>;
  successCode?: number;
};

export const createController: (
  args: ControllerArgs
) => RequestHandler<{}, any, any, any, Record<string, any>> =
  ({ argsParser, handler, successCode = 200 }) =>
  async (req, res, next) => {
    console.log(req.body);
    const parsedData = argsParser.safeParse(req);
    if (!parsedData.success)
      return next(createHttpError.BadRequest(parsedData.error as any));

    try {
      const result = await handler((parsedData as SafeParseSuccess<any>).data);
      res.status(successCode).send({
        status: successCode,
        data: result,
      });
    } catch (error: any) {
      next(
        error.statusCode
          ? createHttpError(error.statusCode, error.message)
          : createHttpError.InternalServerError("UNKNOWN_ERROR")
      );
    }
  };
