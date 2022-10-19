/* eslint-disable @typescript-eslint/ban-ts-comment */
import { errors } from "celebrate";
import cors from "cors";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";

import "express-async-errors";
import "reflect-metadata";
import "../../container";
import { AppError } from "../../errors/AppError";
import { router } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(errors());
app.use(router);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        code: err.code,
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message} `,
    });
  }
);
const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log("Server is running!"));
