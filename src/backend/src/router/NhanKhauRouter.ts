import { Router } from "express";
import { NhanKhauController } from "../controller/NhanKhauController";

export class NhanKhauRouter {
    public router: Router;
    public nhanKhauController = new NhanKhauController();
    
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(): void {
        this.router.get("", this.nhanKhauController.getAllNhanKhau);
        this.router.get("/:id", this.nhanKhauController.getNhanKhauById);
        this.router.post("", this.nhanKhauController.addNewNhanKhau);
        this.router.put("/:id", this.nhanKhauController.updateNhanKhau);
        this.router.delete("/:id", this.nhanKhauController.deleteNhanKhau);
    }
}