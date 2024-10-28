import express, { Request, Response } from "express";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import { ServerRouter } from "./router/ServerRouter";
import { DB_NAME, DB_PASSWORD, DB_USERNAME, MONGO_URL } from "./config/secrets";
import dotenv from "dotenv";
import { CuocHopRouter } from "./router/CuocHopRouter";
import { AuthenRouter } from "./router/AuthenRouter";
import { UserRouter } from "./router/UserRouter";
import { NhanKhauRouter } from "./router/NhanKhauRouter";
import { HoKhauRouter } from "./router/HoKhauRouter";
import { TamTruRouter } from "./router/TamTruRouter";
import { TamVangRouter } from "./router/TamVangRouter";
import { ThongSoRouter } from "./router/ThongSoRouter";
dotenv.config();

const limitMs = Number(process.env.LIMIT_MS ?? 60 * 1000);
const limitRequest = Number(process.env.LIMIT_REQUEST ?? 100);

const limiter = rateLimit({
    windowMs: limitMs,
    limit: limitRequest,
    standardHeaders: "draft-7",
    legacyHeaders: false,
});

class Server {
    public app: express.Application;
    constructor() {
        this.app = express();
        this.config();
        this.mongo();
        this.routes();
    }

    public routes(): void {
        this.app.use("", new ServerRouter().router);
        this.app.use("/api/v1/accounts", new UserRouter().router);
        this.app.use("/api/v1/auth", new AuthenRouter().router);
        this.app.use("/api/v1/nhankhau", new NhanKhauRouter().router);
        this.app.use("/api/v1/hokhau", new HoKhauRouter().router);
        this.app.use("/api/v1/tamtru", new TamTruRouter().router);
        this.app.use("/api/v1/tamvang", new TamVangRouter().router);
        this.app.use("/api/v1/cuochop", new CuocHopRouter().router);
        this.app.use("/api/v1", new ThongSoRouter().router);    
    }

    public config(): void {
        this.app.set("port", process.env.PORT || 8000);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(compression());
        this.app.use(cors());
        this.app.use(limiter);
        this.app.set("trust proxy", 2);

        const myStream = {
            write: (text: any) => {
                console.log(text);
            },
        };
    }

    private mongo(): void {
        try {
            const connection = mongoose.connection;
            connection.on("connected", () => {
                console.log("Mongo Connection Established");
            });
            connection.on("reconnected", () => {
                console.log("Mongo Connection Reestablished");
            });
            connection.on("disconnected", () => {
                console.log("Mongo Connection Disconnected");
                console.log("Trying to reconnect to Mongo ...");
                setTimeout(() => {
                    mongoose
                        .connect(MONGO_URL, {
                            dbName: DB_NAME,
                            user: DB_USERNAME,
                            pass: DB_PASSWORD,
                            autoCreate: true,
                            autoIndex: true,
                        })
                        .catch((err: Error) => {
                            console.log(err);
                        });
                }, 10000);
            });
            connection.on("close", () => {
                console.log("Mongo Connection Closed");
            });
            connection.on("error", (error: Error) => {
                console.log("Mongo Connection ERROR: " + error);
            });

            const run = async () => {
                await mongoose
                    .connect(MONGO_URL, {
                        dbName: DB_NAME,
                        user: DB_USERNAME,
                        pass: DB_PASSWORD,
                        autoCreate: true,
                        autoIndex: true,
                    })
                    .catch((err: Error) => {
                        console.log(err);
                    });
            };
            run().catch((error) => console.error(error));
        } catch (err) {
            console.log(err);
        }
    }

    public start(): void {
        this.app.listen(this.app.get("port"), () => {
            console.log("API is running at http://localhost:" + this.app.get("port"));
        });
    }
}

async function startServer(): Promise<void> {
    const server = new Server();
    server.start();
}

startServer();
