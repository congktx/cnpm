import { Router } from "express";
import { TamVangController } from "../controller/TamVangController";

export class TamVangRouter {
    public router: Router;
    public tamVangController = new TamVangController();
    
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(): void {
        this.router.get("", this.tamVangController.getAllTamVang);
        this.router.get("/:id", this.tamVangController.getTamVangById);
        this.router.post("", this.tamVangController.addNewTamVang);
        this.router.put("/:id", this.tamVangController.updateTamVang);
        this.router.delete("/:id", this.tamVangController.deleteTamVang);
    }
}