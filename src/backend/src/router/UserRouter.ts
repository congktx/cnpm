import { Router } from "express";
import { UserController } from "../controller/UserController";

export class UserRouter {
    public router: Router;
    public userController = new UserController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(): void {
        this.router.get("", this.userController.getAllUsers);
        this.router.get("/:id", this.userController.getUserById);
    }
}