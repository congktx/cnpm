import { Router } from "express";
import { CuocHopController } from "../controller/CuocHopController";
export class CuocHopRouter {
    public router: Router;
    public cuocHopController = new CuocHopController();
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(): void {
        this.router.get("/thongkecuochop", this.cuocHopController.thongKeCuocHop);
        this.router.get("/thongkenguoithamgia", this.cuocHopController.thongKeNguoiThamGia);
        this.router.post("/diemdanh", this.cuocHopController.diemDanhCuocHop);
        this.router.get("/danhsachmoi", this.cuocHopController.getDanhSachMoi);
        this.router.post("/danhsachthamgia/:id", this.cuocHopController.updateDanhSachThamGia);
        this.router.get("/danhsachthamgia/:id", this.cuocHopController.getAllHoKhauByCuocHop);
        this.router.get("/thongkenguoithamgia/:id", this.cuocHopController.thongKeHoKhauThamGiaTheoId);
        this.router.post("/:id/:idHoKhau", this.cuocHopController.themMoiHoKhauVaoCuocHop);
        this.router.delete("/:id/:idHoKhau", this.cuocHopController.xoaHoKhauKhoiCuocHop);
        this.router.get("/:id/diemdanh", this.cuocHopController.getAllDiemDanhByCuocHop);
        this.router.get("/:id", this.cuocHopController.getCuocHopById);
        this.router.put("/:id", this.cuocHopController.updateCuocHop);
        this.router.delete("/:id", this.cuocHopController.deleteCuocHop);
        this.router.get("", this.cuocHopController.getAllCuocHop);
        this.router.post("", this.cuocHopController.addNewCuocHop);
    }
}