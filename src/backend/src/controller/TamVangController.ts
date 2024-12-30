import { Request, Response } from "express";
import TamVang, { ITamVang } from "../model/nhankhau/TamVang";
import { getNextId } from "../utils/utils";
import HoatDong from "../model/HoatDong";

export class TamVangController {
    constructor() {
        this.addNewTamVang = this.addNewTamVang.bind(this);
        this.deleteTamVang = this.deleteTamVang.bind(this);
        this.getAllTamVang = this.getAllTamVang.bind(this);
        this.getTamVangById = this.getTamVangById.bind(this);
        this.updateTamVang = this.updateTamVang.bind(this);
    }

    public async getAllTamVang(req: Request, res: Response) {
        try {
            let { keyword, page, size } = req.query;
            keyword = String(keyword);
            let pageNum = Number(page);
            let sizeNum = Number(size);
            if (isNaN(pageNum) || isNaN(sizeNum)) {
                res.status(400).send("Page & size must be number");
                return;
            }
            if (!keyword) {
                keyword = "";
            }
            let result = await TamVang.find({
                id: { $ne: 0 },
                $or: [
                    { hoVaTen: { $regex: keyword, $options: 'i' } },
                    { cccd: { $regex: keyword, $options: 'i' } },
                    { diaChi: { $regex: keyword, $options: 'i' } },
                ]
            })
                .skip(sizeNum * pageNum)
                .limit(sizeNum)
                .lean();
            res.status(200).send({ result: { content: result } });
        } catch (err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async getTamVangById(req: Request, res: Response) {
        try {
            let { id } = req.params;
            let idNum = Number(id);
            if (isNaN(idNum)) {
                res.status(400).send("Invalid ID");
                return;
            }
            let result = await TamVang.findOne({ id: idNum }).lean();
            res.status(200).send({ result: result });
        } catch (err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async addNewTamVang(req: Request, res: Response) {
        try {
            let { hoVaTen, cccd, diaChi, tuNgay, denNgay, lyDo } = req.body;
            if (typeof hoVaTen != "string" || typeof cccd != "string" || typeof diaChi != "string" || typeof tuNgay != "string" || typeof denNgay != "string" || typeof lyDo != "string") {
                res.status(400).send("Invalid input");
                return;
            }
            let newTamVang: ITamVang = {
                id: await getNextId(TamVang),
                hoVaTen: hoVaTen,
                cccd: cccd,
                diaChi: diaChi,
                tuNgay: new Date(tuNgay),
                denNgay: new Date(denNgay),
                lyDo: lyDo,
            };
            await TamVang.create(newTamVang);
            await HoatDong.create({
                id: await getNextId(HoatDong),
                nhanKhauId: newTamVang.id,
                mess: "Thêm mới nhân khẩu tạm vắng: " + hoVaTen,
            })
            res.status(200).send({ result: newTamVang });
        } catch (err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async updateTamVang(req: Request, res: Response) {
        try {
            let { id } = req.params;
            const idNum = Number(id);
            let { hoVaTen, cccd, diaChi, tuNgay, denNgay, lyDo } = req.body;
            if (isNaN(idNum) || typeof hoVaTen != "string" || typeof cccd != "string" || typeof diaChi != "string" || typeof tuNgay != "string" || typeof denNgay != "string" || typeof lyDo != "string") {
                res.status(400).send("Invalid input");
                return;
            }
            let tamVang = await TamVang.findOne({ id: idNum });
            if (!tamVang) {
                res.status(404).send("Tam vang not found");
                return;
            }
            tamVang.hoVaTen = hoVaTen;
            tamVang.cccd = cccd;
            tamVang.diaChi = diaChi;
            tamVang.tuNgay = new Date(tuNgay);
            tamVang.denNgay = new Date(denNgay);
            tamVang.lyDo = lyDo;
            await tamVang.save();
            await HoatDong.create({
                id: await getNextId(HoatDong),
                time: new Date(Date.now()),
                mess: "Cập nhật nhân khẩu tạm vắng: " + hoVaTen,
            });
        } catch (err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async deleteTamVang(req: Request, res: Response) {
        try {
            let { id } = req.params;
            const idNum = Number(id);
            if (isNaN(idNum)) {
                res.status(400).send("Invalid input");
                return;
            }
            let tamVang = await TamVang.findOne({ id: idNum });
            if (!tamVang) {
                res.status(404).send("Tam vang not found");
                return;
            }
            await HoatDong.create({
                id: await getNextId(HoatDong),
                time: new Date(Date.now()),
                mess: "Xóa nhân khẩu tạm vắng: " + tamVang.hoVaTen,
            });
            await TamVang.deleteOne({ id: idNum });
            res.status(200).send({ result: null });
        } catch (err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }
}