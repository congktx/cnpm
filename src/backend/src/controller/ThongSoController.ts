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
            let {page, size} = req.query;
            if (typeof page != "number" || typeof size != "number") {
                res.status(400).send("Invalid input");
                return;
            }
            let data = await HoatDong.find().skip(size * (page - 1)).limit(size).lean();
            res.status(200).send({result: {content: data}});
        } catch(err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async getThongSo(req: Request, res: Response) {
        try {
            let result: any = {
                soHoKhau: await HoKhau.countDocuments(),
                soNhanKhau: await NhanKhau.countDocuments(),
                soTamTru: await TamTru.countDocuments(),
                soTamVang: await TamVang.countDocuments(),
            };
            res.status(200).send({result: result});
        } catch(err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }
}