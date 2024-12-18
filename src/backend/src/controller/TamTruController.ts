import { Request, Response } from "express";
import TamTru, { ITamTru } from "../model/nhankhau/TamTru";
import { getNextId } from "../utils/utils";
import HoatDong from "../model/HoatDong";

export class TamTruController {
    constructor() {
        this.addNewTamTru = this.addNewTamTru.bind(this);
        this.deleteTamTru = this.deleteTamTru.bind(this);
        this.getAllTamTru = this.getAllTamTru.bind(this);
        this.getTamTruById = this.getTamTruById.bind(this);
        this.updateTamTru = this.updateTamTru.bind(this);
    }

    public async getAllTamTru(req: Request, res: Response) {
        try {
            let {keyword, page, size} = req.query;
            keyword = String(keyword);
            let pageNum = Number(page);
            let sizeNum = Number(size);
            let result = await TamTru.find({id: {$ne: 0}})
                .skip(sizeNum * pageNum)
                .limit(sizeNum)
                .lean();
            res.status(200).send({result: {content: result}});
        } catch (err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async getTamTruById(req: Request, res: Response) {
        try {
            let {id} = req.params;
            let idNum = Number(id);
            let result = await TamTru.findOne({id: idNum}).lean();
            res.status(200).send({result: result});
        } catch (err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async addNewTamTru(req: Request, res: Response) {
        try {
            let {hoVaTen, cccd, diaChi, tuNgay, denNgay, lyDo} = req.body;
            if (typeof hoVaTen != "string" || typeof cccd != "string" || typeof diaChi != "string" || typeof tuNgay != "string" || typeof denNgay != "string" || typeof lyDo != "string") {
                res.status(400).send("Invalid input");
                return;
            }
            let newTamTru: ITamTru = {
                id: await getNextId(TamTru),
                hoVaTen: hoVaTen,
                cccd: cccd,
                diaChi: diaChi,
                tuNgay: new Date(tuNgay),
                denNgay: new Date(denNgay),
                lyDo: lyDo,
            };
            await TamTru.create(newTamTru);
            await HoatDong.create({
                id: await getNextId(HoatDong),
                nhanKhauId: newTamTru.id,
                mess: "Thêm mới nhân khẩu tạm trú: " + hoVaTen,
            })
            res.status(200).send({result: newTamTru});
        } catch(err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async updateTamTru(req: Request, res: Response) {
        try {
            let {id} = req.params;
            let {hoVaTen, cccd, diaChi, tuNgay, denNgay, lyDo} = req.body;
            if (typeof id != "number" || typeof hoVaTen != "string" || typeof cccd != "string" || typeof diaChi != "string" || typeof tuNgay != "string" || typeof denNgay != "string" || typeof lyDo != "string") {
                res.status(400).send("Invalid input");
                return;
            }
            let tamTru = await TamTru.findOne({id: id});
            if (!tamTru) {
                res.status(404).send("Tam tru not found");
                return;
            }
            tamTru.hoVaTen = hoVaTen;
            tamTru.cccd = cccd;
            tamTru.diaChi = diaChi;
            tamTru.tuNgay = new Date(tuNgay);
            tamTru.denNgay = new Date(denNgay);
            tamTru.lyDo = lyDo;
            await tamTru.save();
            await HoatDong.create({
                id: await getNextId(HoatDong),
                time: new Date(Date.now()),
                mess: "Cập nhật nhân khẩu tạm trú: " + hoVaTen,
            });
        } catch(err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async deleteTamTru(req: Request, res: Response) {
        try {
            let {id} = req.params;
            if (typeof id != "number") {
                res.status(400).send("Invalid input");
                return;
            }
            let tamTru = await TamTru.findOne({id: id});
            if (!tamTru) {
                res.status(404).send("Tam tru not found");
                return;
            }
            await HoatDong.create({
                id: await getNextId(HoatDong),
                time: new Date(Date.now()),
                mess: "Xóa nhân khẩu tạm trú: " + tamTru.hoVaTen,
            });
            await TamTru.deleteOne({id: id});
            res.status(200).send({result: null});
        } catch(err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }
}