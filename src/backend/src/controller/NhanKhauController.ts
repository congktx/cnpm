import { Request, Response } from "express";
import NhanKhau, { INhanKhau, NhanKhauReq } from "../model/nhankhau/NhanKhau";
import { getNextId } from "../utils/utils";
import HoatDong from "../model/HoatDong";

export class NhanKhauController {
    constructor() {
        this.getAllNhanKhau = this.getAllNhanKhau.bind(this);
        this.getNhanKhauById = this.getNhanKhauById.bind(this);
        this.addNewNhanKhau = this.addNewNhanKhau.bind(this);
        this.updateNhanKhau = this.updateNhanKhau.bind(this);
        this.deleteNhanKhau = this.deleteNhanKhau.bind(this);
    }

    public async getAllNhanKhau(req: Request, res: Response) {
        try {
            let { keyword, page, size } = req.query;
            keyword = String(keyword);
            let pageNum = Number(page);
            let sizeNum = Number(size);
            if (isNaN(pageNum) || isNaN(sizeNum)) {
                res.status(400).send("Invalid input");
                return;
            }

            let nhanKhaus = await NhanKhau.find({ id: { $ne: 0 } })
                .limit(sizeNum)
                .skip(sizeNum * pageNum)
                .lean();
            res.status(200).send({
                result: {
                    content: nhanKhaus
                }
            });
        } catch (err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async getNhanKhauById(req: Request, res: Response) {
        try {
            let { id } = req.params;
            const idNum = Number(id);
            if (isNaN(idNum)) {
                res.status(400).send("Invalid input");
                return;
            }
            let nhanKhau = await NhanKhau.findOne({ id: idNum }).lean();
            if (!nhanKhau) {
                res.status(404).send("Not found");
                return;
            }
            res.status(200).send({ result: nhanKhau });
        } catch (err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async addNewNhanKhau(req: Request, res: Response) {
        try {
            let reqBody: any = {};
            for (let key of Object.keys(NhanKhauReq)) {
                if (key == 'hoVaTenKhac') continue;
                if (typeof req.body[key] != NhanKhauReq[key]) {
                    console.log(key, typeof req.body[key], NhanKhauReq[key]);
                    res.status(400).send("Invalid input");
                    return;
                }
                if (key == "tenKhac") reqBody["hoVaTenKhac"] = req.body[key];
                else reqBody[key] = req.body[key];
            }
            const nhanKhau = await NhanKhau.findOne({ cccd: reqBody['cccd'] }).lean();
            if (nhanKhau) {
                res.status(400).send("Nhân khẩu đã tồn tại");
                return;
            }

            reqBody["isChuHo"] = (reqBody["quanHeVoiChuHo"] == "chủ hộ");
            reqBody["ngaySinh"] = new Date(reqBody["ngaySinh"]);
            console.log(reqBody);
            let newNhanKhau: INhanKhau = {
                id: await getNextId(NhanKhau),
                ...reqBody,
            };
            console.log(newNhanKhau);
            await NhanKhau.create(newNhanKhau);
            await HoatDong.create({
                id: await getNextId(HoatDong),
                time: new Date(Date.now()),
                mess: "Thêm mới nhân khẩu: " + newNhanKhau.hoVaTen,
            });
            res.status(200).send({ result: newNhanKhau });
        } catch (err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async updateNhanKhau(req: Request, res: Response) {
        try {
            let { id } = req.params;
            const idNum = Number(id);
            if (isNaN(idNum)) {
                res.status(400).send("Invalid input");
                return;
            }
            for (let key of Object.keys(NhanKhauReq)) {
                if (key == 'hoVaTenKhac') continue;
                if (typeof req.body[key] != NhanKhauReq[key]) {
                    res.status(400).send("Invalid input");
                    return;
                }
            }
            let nhanKhau: any = await NhanKhau.findOne({ id: idNum });
            if (!nhanKhau) {
                res.status(404).send("nhan khau not found");
                return;
            }
            req.body["ngaySinh"] = new Date(req.body["ngaySinh"]);
            for (let key of Object.keys(req.body)) {
                nhanKhau[key] = req.body[key];
            }
            await nhanKhau.save();
            await HoatDong.create({
                id: await getNextId(HoatDong),
                time: new Date(Date.now()),
                mess: "Sửa thông tin nhân khẩu: " + nhanKhau.hoVaTen,
            });
            res.status(200).send({ result: nhanKhau });
        } catch (err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async deleteNhanKhau(req: Request, res: Response) {
        try {
            let { id } = req.params;
            const idNum = Number(id);
            if (isNaN(idNum)) {
                res.status(400).send("Invalid input");
                return;
            }
            let nhanKhau = await NhanKhau.findOne({ id: idNum });
            if (!nhanKhau) {
                res.status(404).send("nhan khau not found");
                return;
            }
            await NhanKhau.deleteOne({ id: idNum });
            await HoatDong.create({
                id: await getNextId(HoatDong),
                time: new Date(Date.now()),
                mess: "Xóa nhân khẩu: " + nhanKhau.hoVaTen,
            });
            res.status(200).send({ result: null });
        } catch (err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }
}