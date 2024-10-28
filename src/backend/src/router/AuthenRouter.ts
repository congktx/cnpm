import { Router } from "express";
import { AuthenController } from "../controller/AuthenController";

export class AuthenRouter {
    public router: Router;
    public authenController = new AuthenController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(): void {
        this.router.post("/register", this.authenController.register);
        this.router.post("/login", this.authenController.login);
        this.router.post("/change-password/:id", this.authenController.changePassword);
    }
}