import { Request, Response } from "express";
import HoatDong from "../model/HoatDong";
import HoKhau from "../model/hokhau/HoKhau";
import NhanKhau from "../model/nhankhau/NhanKhau";
import TamTru from "../model/nhankhau/TamTru";
import TamVang from "../model/nhankhau/TamVang";

export class ThongSoController {
    constructor() {
        this.getHoatDong = this.getHoatDong.bind(this);
        this.getThongSo = this.getThongSo.bind(this);
    }

    public async getHoatDong(req: Request, res: Response) {
        try {
            let { page, size } = req.query;
            let pageNum = Number(page);
            let sizeNum = Number(size);
            if (isNaN(pageNum) || isNaN(sizeNum)) {
                res.status(400).send("Page & size must be number");
                return;
            }
            let data = await HoatDong.find({ id: { $ne: 0 } }).skip(sizeNum * pageNum).limit(sizeNum).lean();
            res.status(200).send({ result: { content: data } });
        } catch (err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async getThongSo(req: Request, res: Response) {
        try {
            let result: any = {
                soHoKhau: Math.max(0, await HoKhau.countDocuments() - 1),
                soNhanKhau: Math.max(0, await NhanKhau.countDocuments() - 1),
                soTamTru: Math.max(0, await TamTru.countDocuments() - 1),
                soTamVang: Math.max(0, await TamVang.countDocuments() - 1),
            };
            res.status(200).send({ result: result });
        } catch (err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }
}