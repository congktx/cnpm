import { Router } from "express";
import { ThongSoController } from "../controller/ThongSoController";

export class ThongSoRouter {
    public router: Router;
    public thongSoController = new ThongSoController();
    
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(): void {
        this.router.get("/hoatdong", this.thongSoController.getHoatDong);
        this.router.get("/thongso", this.thongSoController.getThongSo);
    }
}