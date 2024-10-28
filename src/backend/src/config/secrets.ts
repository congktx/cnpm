import * as dotenv from "dotenv";
dotenv.config();

export const MONGO_URL = process.env.MONGO_URL ?? "mongodb://localhost:27017";
export const DB_NAME = process.env.DB_NAME ?? "cnpm";
export const DB_USERNAME = process.env.DB_USERNAME ?? "";
export const DB_PASSWORD = process.env.DB_PASSWORD ?? "";

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? "";
export const ACCESS_TOKEN_TIME: any = process.env.ACCESS_TOKEN_TIME ?? 2592000;