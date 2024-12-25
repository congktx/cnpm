import { Request, Response } from "express";
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
            let { keyword, page, size } = req.query;
            keyword = String(keyword);
            let pageNum = Number(page);
            let sizeNum = Number(size);
            if (isNaN(pageNum) || isNaN(sizeNum)) {
                res.status(400).send("Page & size must be number");
                return;
            }
            let hoKhaus = await HoKhau.find({ id: { $ne: 0 } })
                .skip(pageNum * sizeNum)
                .limit(sizeNum)
                .lean();
            res.status(200).send({ result: { content: hoKhaus } });
        } catch (err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async getHoKhauById(req: Request, res: Response) {
        try {
            let { id } = req.params;
            if (isNaN(Number(id))) {
                res.status(400).send("Invalid ID");
                return;
            }
            let hoKhau = await HoKhau.findOne({ id: Number(id) }).lean();

            if (!hoKhau) {
                res.status(404).send("HoKhau not found");
                return;
            }

            let result: any = hoKhau;
            result.nhanKhaus = [];
            for (let nhanKhauId of result.nhanKhauIds) {
                let nhanKhau = await NhanKhau.findOne({ id: nhanKhauId }).lean();
                if (nhanKhau) result.nhanKhaus.push(nhanKhau);
            }
            res.status(200).send({ result: result });
        } catch (err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async addNewHoKhau(req: Request, res: Response) {
        try {
            let { hoTenChuHo, cccdChuHo, diaChi, nhanKhaus } = req.body;
            if (typeof hoTenChuHo != "string" || typeof cccdChuHo != "string" || typeof diaChi != "string" || !Array.isArray(nhanKhaus)) {
                res.status(400).send("Invalid input");
                return;
            }
            if (nhanKhaus.length > 0 && typeof nhanKhaus[0] != "number") {
                res.status(400).send("Invalid input");
                return;
            }
            let newHoKhau: IHoKhau = {
                id: await getNextId(HoKhau),
                hoTenChuHo: hoTenChuHo,
                cccdChuHo: cccdChuHo,
                diaChi: diaChi,
                nhanKhauIds: nhanKhaus
            };
            await HoKhau.create(newHoKhau);
            for (let nhanKhauId of nhanKhaus) {
                let nhanKhau = await NhanKhau.findOne({ id: nhanKhauId });
                if (nhanKhau) {
                    nhanKhau.idhk = newHoKhau.id;
                    await nhanKhau.save();
                }
            }
            await HoatDong.create({
                id: await getNextId(HoatDong),
                time: new Date(Date.now()),
                mess: "Thêm mới hộ khẩu: " + hoTenChuHo,
            });
            res.status(200).send({ result: newHoKhau });
        } catch (err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async updateHoKhau(req: Request, res: Response) {
        try {
            let { id } = req.params;
            let { hoTenChuHo, cccdChuHo, diaChi, nhanKhaus } = req.body;
            if (typeof hoTenChuHo != "string" || typeof cccdChuHo != "string" || typeof diaChi != "string" || !Array.isArray(nhanKhaus)) {
                res.status(400).send("Invalid input");
                return;
            }
            if (nhanKhaus.length > 0 && typeof nhanKhaus[0] != "number") {
                console.log("here\n")
                res.status(400).send("Invalid input");
                return;
            }
            let idNum = Number(id);
            if (isNaN(idNum)) {
                res.status(400).send("Invalid ID");
                return;
            }

            let hoKhau = await HoKhau.findOne({ id: idNum });
            if (!hoKhau) {
                res.status(404).send("HoKhau not found");
                return;
            }
            let nhanKhauIds = nhanKhaus;
            for (let nhanKhauId of hoKhau.nhanKhauIds) {
                let nhanKhau = await NhanKhau.findOne({ id: nhanKhauId });
                if (nhanKhau) {
                    nhanKhau.idhk = 0;
                    await nhanKhau.save();
                }
            }
            for (let nhanKhauId of nhanKhauIds) {
                let nhanKhau = await NhanKhau.findOne({ id: nhanKhauId });
                if (nhanKhau) {
                    nhanKhau.idhk = idNum;
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
                time: new Date(Date.now()),
                mess: "Cập nhật hộ khẩu: " + hoTenChuHo,
            });
            let result: any = {
                id: hoKhau.id,
                hoTenChuHo: hoKhau.hoTenChuHo,
                cccdChuHo: hoKhau.cccdChuHo,
                diaChi: hoKhau.diaChi,
                nhanKhaus: []
            };
            for (let nhanKhauId of hoKhau.nhanKhauIds) {
                let nhanKhau = await NhanKhau.findOne({ id: nhanKhauId }).lean();
                if (nhanKhau) result.nhanKhaus.push(nhanKhau);
            }
            res.status(200).send({ result: result });
        } catch (err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async deleteHoKhau(req: Request, res: Response) {
        try {
            let { id } = req.params;
            const idNum = Number(id);
            if (isNaN(idNum)) {
                res.status(400).send("Invalid input");
                return;
            }
            let hoKhau = await HoKhau.findOne({ id: idNum });
            if (!hoKhau) {
                res.status(404).send("HoKhau not found");
                return;
            }
            await HoatDong.create({
                id: await getNextId(HoatDong),
                time: new Date(Date.now()),
                mess: "Xóa hộ khẩu: " + hoKhau.hoTenChuHo,
            });
            await HoKhau.deleteOne({ id: idNum });
            res.status(200).send({ result: null });
        } catch (err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }
}