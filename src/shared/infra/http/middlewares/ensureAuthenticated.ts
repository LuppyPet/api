/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextFunction, Request, Response } from "express";
import { TokenExpiredError, verify } from "jsonwebtoken";

import auth from "../../../../config/auth";
import { AppError } from "../../../errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError({
      message: "Token missing",
      statusCode: 401,
      code: "token.missing",
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, auth.secretToken) as IPayload;

    request.user = {
      id: user_id,
    };

    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw new AppError({
        message: "Token expired",
        statusCode: 401,
        code: "token.expired",
      });
    }
    throw new AppError({
      message: "Token invalid",
      statusCode: 401,
      code: "token.invalid",
    });
  }
}
