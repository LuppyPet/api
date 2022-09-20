/* eslint-disable @typescript-eslint/ban-ts-comment */
import "dotenv/config";
import express from "express";
import "express-async-errors";
import "reflect-metadata";

const app = express();

app.use(express.json());

app.listen(3333, () => console.log("Server is running!"));
