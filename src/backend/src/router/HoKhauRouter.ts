import { Router } from "express";
import { HoKhauController } from "../controller/HoKhauController";

export class HoKhauRouter {
    public router: Router;
    public hoKhauController = new HoKhauController();
    
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(): void {
        this.router.get("", this.hoKhauController.getAllHoKhau);
        this.router.get("/:id", this.hoKhauController.getHoKhauById);
        this.router.post("", this.hoKhauController.addNewHoKhau);
        this.router.put("/:id", this.hoKhauController.updateHoKhau);
        this.router.delete("/:id", this.hoKhauController.deleteHoKhau);
    }
}