/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;
const asyncHandler =
  (fn: AsyncHandler) => (req: Request, res: Response, next: any) =>
    Promise.resolve(fn(req, res, next)).catch((error) => {
      next(error, req, res);
      console.log(error);
    });

export default asyncHandler;
