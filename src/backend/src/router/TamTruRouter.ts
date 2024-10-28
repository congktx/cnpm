import { Router } from "express";
import { TamTruController } from "../controller/TamTruController";

export class TamTruRouter {
    public router: Router;
    public tamTruController = new TamTruController();
    
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(): void {
        this.router.get("", this.tamTruController.getAllTamTru);
        this.router.get("/:id", this.tamTruController.getTamTruById);
        this.router.post("", this.tamTruController.addNewTamTru);
        this.router.put("/:id", this.tamTruController.updateTamTru);
        this.router.delete("/:id", this.tamTruController.deleteTamTru);
    }
}