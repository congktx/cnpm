import { Request, Response } from "express";
import NhanKhau, {INhanKhau, ValueKeyNhanKhau} from "../model/nhankhau/NhanKhau";
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
            let {keyword, page, size} = req.query;
            if (typeof keyword != "string" || typeof page != "number" || typeof size != "number") {
                res.status(400).send("Invalid input");
                return;
            }
            let nhanKhaus = await NhanKhau.find({
                $or: [
                    {hoVaTen: keyword, idhk: {$ne: 0}},
                    {cccd: keyword, idhk: {$ne: 0}},
                ]
            })
            .limit(size)
            .skip(size * (page - 1))
            .lean();
            res.status(200).send({
                result: {
                    content: nhanKhaus
                }
            });
        } catch(err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async getNhanKhauById(req: Request, res: Response) {
        try {
            let {id} = req.params;
            if (typeof id != "number") {
                res.status(400).send("Invalid input");
                return;
            }
            let nhanKhau = await NhanKhau.findOne({id: id}).lean();
            if (!nhanKhau) {
                res.status(404).send("Not found");
                return;
            }
            res.status(200).send({result: nhanKhau});
        } catch(err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async addNewNhanKhau(req: Request, res: Response) {
        try {
            for (let key of Object.keys(ValueKeyNhanKhau)) {
                if (typeof req.body[key] != ValueKeyNhanKhau[key]) {
                    res.status(400).send("Invalid input");
                    return;
                }
            }
            let newNhanKhau: INhanKhau = {
                id: await getNextId(NhanKhau),
                idhk: 0,
                ...req.body,
            };
            await NhanKhau.create(newNhanKhau);
            await HoatDong.create({
                id: await getNextId(HoatDong),
                time: new Date(Date.now()).toISOString(),
                mess: "Thêm mới nhân khẩu: " + newNhanKhau.hoVaTen,
            });
            res.status(200).send({result: newNhanKhau});
        } catch(err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async updateNhanKhau(req: Request, res: Response) {
        try {
            let {id} = req.params;
            if (typeof id != "number") {
                res.status(400).send("Invalid input");
                return;
            }
            for (let key of Object.keys(ValueKeyNhanKhau)) {
                if (typeof req.body[key] != ValueKeyNhanKhau[key]) {
                    res.status(400).send("Invalid input");
                    return;
                }
            }
            let nhanKhau: any = await NhanKhau.findOne({id: id});
            if (!nhanKhau) {
                res.status(404).send("nhan khau not found");
                return;
            }
            for (let key of Object.keys(req.body)) {
                nhanKhau[key] = req.body[key];
            }
            await nhanKhau.save();
            await HoatDong.create({
                id: await getNextId(HoatDong),
                time: new Date(Date.now()).toISOString(),
                mess: "Sửa thông tin nhân khẩu: " + nhanKhau.hoVaTen,
            });
            res.status(200).send({result: nhanKhau});
        } catch(err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async deleteNhanKhau(req: Request, res: Response) {
        try {
            let {id} = req.params;
            if (typeof id != "number") {
                res.status(400).send("Invalid input");
                return;
            }
            let nhanKhau = await NhanKhau.findOne({id: id});
            if (!nhanKhau) {
                res.status(404).send("nhan khau not found");
                return;
            }
            await NhanKhau.deleteOne({id: id});
            await HoatDong.create({
                id: await getNextId(HoatDong),
                time: new Date(Date.now()).toISOString(),
                mess: "Xóa nhân khẩu: " + nhanKhau.hoVaTen,
            });
            res.status(200).send({result: null});
        } catch(err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }
}