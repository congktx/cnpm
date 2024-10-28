import {Request, Response} from "express";
import HoKhau, { IHoKhau } from "../model/hokhau/HoKhau";
import { getNextId } from "../utils/utils";
import NhanKhau from "../model/nhankhau/NhanKhau";
import HoatDong from "../model/HoatDong";

export class HoKhauController {
    constructor() {
        this.addNewHoKhau = this.addNewHoKhau.bind(this);
        this.deleteHoKhau = this.deleteHoKhau.bind(this);
        this.getAllHoKhau = this.getAllHoKhau.bind(this);
        this.getHoKhauById = this.getHoKhauById.bind(this);
        this.updateHoKhau = this.updateHoKhau.bind(this);
    }

    public async getAllHoKhau(req: Request, res: Response) {
        try {
            let {keyword, page, size} = req.query;
            if (typeof keyword != "string" || typeof page != "number" || typeof size != "number") {
                res.status(400).send("Invalid input");
                return;
            }
            let hoKhaus = await HoKhau.find({
                $or: [
                    {hoTenChuHo: keyword},
                    {cccdChuHo: keyword}
                ]
            })
            .skip((page - 1) * size)
            .limit(size)
            .lean();
            res.status(200).send({result: hoKhaus});
        } catch (err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async getHoKhauById(req: Request, res: Response) {
        try {
            let {id} = req.params;
            if (typeof id != "number") {
                res.status(400).send("Invalid input");
                return;
            }
            let hoKhau = await HoKhau.findById(id).lean();
            res.status(200).send({result: hoKhau});
        } catch (err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async addNewHoKhau(req: Request, res: Response) {
        try {
            let {hoTenChuHo, cccdChuHo, diaChi, nhanKhauIds} = req.body;
            if (typeof hoTenChuHo != "string" || typeof cccdChuHo != "string" || typeof diaChi != "string" || !Array.isArray(nhanKhauIds)) {
                res.status(400).send("Invalid input");
                return;
            }
            if (nhanKhauIds.length > 0 && typeof nhanKhauIds[0] != "number") {
                res.status(400).send("Invalid input");
                return;
            }
            let newHoKhau: IHoKhau = {
                id: await getNextId(HoKhau),
                hoTenChuHo: hoTenChuHo,
                cccdChuHo: cccdChuHo,
                diaChi: diaChi,
                nhanKhauIds: nhanKhauIds
            };
            await HoKhau.create(newHoKhau);
            for (let nhanKhauId of nhanKhauIds) {
                let nhanKhau = await NhanKhau.findOne({id: nhanKhauId});
                if (nhanKhau) {
                    nhanKhau.idhk = newHoKhau.id;
                    await nhanKhau.save();
                }
            }
            await HoatDong.create({
                id: await getNextId(HoatDong),
                time: new Date(Date.now()).toISOString(),
                mess: "Thêm mới hộ khẩu: " + hoTenChuHo,
            });
            res.status(200).send({result: newHoKhau});
        } catch(err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async updateHoKhau(req: Request, res: Response) {
        try {
            let {id} = req.params;
            let {hoTenChuHo, cccdChuHo, diaChi, nhanKhauIds} = req.body;
            if (typeof id != "number" || typeof hoTenChuHo != "string" || typeof cccdChuHo != "string" || typeof diaChi != "string" || !Array.isArray(nhanKhauIds)) {
                res.status(400).send("Invalid input");
                return;
            }
            if (nhanKhauIds.length > 0 && typeof nhanKhauIds[0] != "number") {
                res.status(400).send("Invalid input");
                return;
            }
            let hoKhau = await HoKhau.findOne({id: id});
            if (!hoKhau) {
                res.status(404).send("HoKhau not found");
                return;
            }
            for (let nhanKhauId of hoKhau.nhanKhauIds) {
                let nhanKhau = await NhanKhau.findOne({id: nhanKhauId});
                if (nhanKhau) {
                    nhanKhau.idhk = 0;
                    await nhanKhau.save();
                }
            }
            for (let nhanKhauId of nhanKhauIds) {
                let nhanKhau = await NhanKhau.findOne({id: nhanKhauId});
                if (nhanKhau) {
                    nhanKhau.idhk = id;
                    await nhanKhau.save();
                }
            }
            hoKhau.hoTenChuHo = hoTenChuHo;
            hoKhau.cccdChuHo = cccdChuHo;
            hoKhau.diaChi = diaChi;
            hoKhau.nhanKhauIds = nhanKhauIds;
            await hoKhau.save();
            await HoatDong.create({
                id: await getNextId(HoatDong),
                time: new Date(Date.now()).toISOString(),
                mess: "Cập nhật hộ khẩu: " + hoTenChuHo,
            });
            res.status(200).send({result: hoKhau});
        } catch(err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async deleteHoKhau(req: Request, res: Response) {
        try {
            let {id} = req.params;
            if (typeof id != "number") {
                res.status(400).send("Invalid input");
                return;
            }
            let hoKhau = await HoKhau.findOne({id: id});
            if (!hoKhau) {
                res.status(404).send("HoKhau not found");
                return;
            }
            await HoatDong.create({
                id: await getNextId(HoatDong),
                time: new Date(Date.now()).toISOString(),
                mess: "Xóa hộ khẩu: " + hoKhau.hoTenChuHo,
            });
            await HoKhau.deleteOne({id: id});
            res.status(200).send({result: null});
        } catch(err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }
}