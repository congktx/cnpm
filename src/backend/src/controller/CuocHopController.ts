import { Request, Response } from "express";
import CuocHop, { ICuocHop } from "../model/cuochop/CuocHop";
import DiemDanh, { IDiemDanh } from "../model/cuochop/DiemDanh";
import HoKhau from "../model/hokhau/HoKhau";
import HoatDong, { IHoatDong } from "../model/HoatDong";
import {getNextId} from "../utils/utils";

export class CuocHopController {
    constructor() {
        this.getAllCuocHop = this.getAllCuocHop.bind(this);
        this.getCuocHopById = this.getCuocHopById.bind(this);
        this.addNewCuocHop = this.addNewCuocHop.bind(this);
        this.updateCuocHop = this.updateCuocHop.bind(this);
        this.themMoiHoKhauVaoCuocHop = this.themMoiHoKhauVaoCuocHop.bind(this);
        this.xoaHoKhauKhoiCuocHop = this.xoaHoKhauKhoiCuocHop.bind(this);
        this.deleteCuocHop = this.deleteCuocHop.bind(this);
        this.thongKeCuocHop = this.thongKeCuocHop.bind(this);
        this.thongKeNguoiThamGia = this.thongKeNguoiThamGia.bind(this);
        this.thongKeHoKhauThamGiaTheoId = this.thongKeHoKhauThamGiaTheoId.bind(this);
        this.diemDanhCuocHop = this.diemDanhCuocHop.bind(this);
        this.getAllDiemDanhByCuocHop = this.getAllDiemDanhByCuocHop.bind(this);
        this.getAllHoKhauByCuocHop = this.getAllHoKhauByCuocHop.bind(this);
        this.updateDanhSachThamGia = this.updateDanhSachThamGia.bind(this);
        this.getDanhSachMoi = this.getDanhSachMoi.bind(this);
    }

    public async getAllCuocHop(req: Request, res: Response) {
        try {
            let {keyword, page, size} = req.query;
            if (typeof page != "number" || typeof size != "number") {
                res.status(400).send("Page and size must be numbers");
                return;
            }
            if (!keyword) {
                keyword = "";
            }
            let cuocHops = await CuocHop.find({
                $or: [
                    {tieuDe: keyword},
                    {diaDiem: keyword},
                    {nguoiTao: keyword},
                ]
            })
            .limit(size)
            .skip(size * (page - 1))
            .lean();
            let result: any = {
                content: [],
            };
            for (let i=0; i<cuocHops.length; i++) {
                let cuocHop = cuocHops[i];
                let res: any = {
                    id: cuocHop.id,
                    tieuDe: cuocHop.tieuDe,
                    thoiGian: cuocHop.thoiGian,
                    diaDiem: cuocHop.diaDiem,
                    noiDung: cuocHop.noiDung,
                    banBaoCao: cuocHop.banBaoCao,
                    nguoiTao: cuocHop.nguoiTao,
                    hoKhaus: [],
                    thamGia: 0,
                    vangMat: 0,
                };
                for (let j=0; j<cuocHop.hoKhauIds.length; j++) {
                    let hoKhauId = cuocHop.hoKhauIds[j];
                    let hoKhau = await HoKhau.findOne({id: hoKhauId});
                    if (!hoKhau) continue;
                    res.hoKhaus.push({
                        id: hoKhau.id,
                        hoTenChuHo: hoKhau.hoTenChuHo,
                    });
                    let diemDanh = await DiemDanh.findOne({cuocHopId: cuocHop.id, hoKhauId: hoKhauId});
                    if (diemDanh) {
                        if (diemDanh.diemDanh) {
                            res.thamGia++;
                        } else {
                            res.vangMat++;
                        }
                    }
                }
                result.content.push(res);
            }
            res.status(200).send({result: result});
        } catch(err: any) {
            res.status(500).send(err.toString());
        }
    }

    public async getCuocHopById(req: Request, res: Response) {
        try {
            let {id} = req.params;
            let cuocHop = await CuocHop.findOne({id: id}).lean();
            if (!cuocHop) {
                res.status(404).send("cuoc hop not found");
                return;
            }
            res.status(200).send({result: cuocHop});
        } catch(err: any) {
            res.status(500).send(err.toString());
        }
    }

    public async addNewCuocHop(req: Request, res: Response) {
        try {
            let {tieuDe, thoiGian, diaDiem, noiDung, banBaoCao, nguoiTao, hoKhauIds} = req.body;
            if (typeof tieuDe != "string" || typeof thoiGian != "string" || typeof diaDiem != "string" || typeof noiDung != "string" || typeof banBaoCao != "string" || typeof nguoiTao != "string" || !Array.isArray(hoKhauIds)) {
                res.status(400).send("Invalid input");
                return;
            }
            if (hoKhauIds.length > 0 && typeof hoKhauIds[0] != "number") {
                res.status(400).send("Invalid input");
                return;
            }
            let idCuocHop = await getNextId(CuocHop);
            let newCuocHop: ICuocHop = {
                id: idCuocHop,
                tieuDe: tieuDe,
                thoiGian: thoiGian,
                diaDiem: diaDiem,
                noiDung: noiDung,
                banBaoCao: banBaoCao,
                nguoiTao: nguoiTao,
                hoKhauIds: hoKhauIds,
            };
            await CuocHop.create(newCuocHop);
            for (let idHoKhau of hoKhauIds) {
                let newDiemDanh: IDiemDanh = {
                    id: await getNextId(DiemDanh),
                    hoKhauId: idHoKhau,
                    cuocHopId: idCuocHop,
                    diemDanh: true,
                    lyDo: "",
                };
                await DiemDanh.create(newDiemDanh);
            }
            await HoatDong.create({
                id: await getNextId(HoatDong),
                time: new Date(Date.now()).toISOString(),
                mess: "Tạo mới cuộc họp: " + tieuDe,
            });
            res.status(200).send("API Success");
        } catch(err: any) {
            res.status(500).send(err.toString());
        }
    }

    public async updateCuocHop(req: Request, res: Response) {
        try {
            let {id} = req.params;
            let {tieuDe, thoiGian, diaDiem, noiDung, banBaoCao, nguoiTao, hoKhauIds} = req.body;
            if (typeof id != "number") {
                res.status(400).send("Invalid input");
                return;
            }
            if (typeof tieuDe != "string" || typeof thoiGian != "string" || typeof diaDiem != "string" || typeof noiDung != "string" || typeof banBaoCao != "string" || typeof nguoiTao != "string" || !Array.isArray(hoKhauIds)) {
                res.status(400).send("Invalid input");
                return;
            }
            if (hoKhauIds.length > 0 && typeof hoKhauIds[0] != "number") {
                res.status(400).send("Invalid input");
                return;
            }
            let cuocHop = await CuocHop.findOne({id: id});
            if (!cuocHop) {
                res.status(404).send("cuoc hop not found");
                return;
            }
            cuocHop.tieuDe = tieuDe;
            cuocHop.thoiGian = thoiGian;
            cuocHop.diaDiem = diaDiem;
            cuocHop.noiDung = noiDung;
            cuocHop.banBaoCao = banBaoCao;
            cuocHop.nguoiTao = nguoiTao;
            cuocHop.hoKhauIds = hoKhauIds;
            await cuocHop.save();
            let result: any = {
                id: cuocHop.id,
                tieuDe: cuocHop.tieuDe,
                thoiGian: new Date(cuocHop.thoiGian).toISOString(),
                diaDiem: cuocHop.diaDiem,
                noiDung: cuocHop.noiDung,
                banBaoCao: cuocHop.banBaoCao,
                nguoiTao: cuocHop.nguoiTao,
                hoKhaus: [],
            };
            for (let idHoKhau of hoKhauIds) {
                let hoKhau = await HoKhau.findOne({id: idHoKhau});
                if (!hoKhau) continue;
                result.hoKhaus.push({
                    id: hoKhau.id,
                    hoTenChuHo: hoKhau.hoTenChuHo,
                });
            };
            await HoatDong.create({
                id: await getNextId(HoatDong),
                time: new Date(Date.now()).toISOString(),
                mess: "Chỉnh sửa cuộc họp: " + tieuDe,
            });
            res.status(200).send({result: result});
        } catch(err: any) {
            res.status(500).send(err.toString());
        }
    }

    public async themMoiHoKhauVaoCuocHop(req: Request, res: Response) {
        try {
            let {id, idHoKhau} = req.params;
            if (typeof id != "number" || typeof idHoKhau != "number") {
                res.status(400).send("Invalid input");
                return;
            }
            let cuocHop = await CuocHop.findOne({id: id});
            if (!cuocHop) {
                res.status(404).send("cuoc hop not found");
                return;
            }
            let hoKhau = await HoKhau.findOne({id: idHoKhau});
            if (!hoKhau) {
                res.status(404).send("ho khau not found");
                return;
            }
            if (cuocHop.hoKhauIds.includes(idHoKhau)) {
                res.status(400).send("ho khau da co trong cuoc hop");
                return;
            }
            cuocHop.hoKhauIds.push(idHoKhau);
            await cuocHop.save();
            let newDiemDanh: IDiemDanh = {
                id: await getNextId(DiemDanh),
                hoKhauId: idHoKhau,
                cuocHopId: id,
                diemDanh: true,
                lyDo: "",
            };
            await DiemDanh.create(newDiemDanh);
            res.status(200).send({ result: null});
        } catch(err: any) {
            res.status(500).send(err.toString());
        }
    }

    public async xoaHoKhauKhoiCuocHop(req: Request, res: Response) {
        try {
            let {id, idHoKhau} = req.params;
            if (typeof id != "number" || typeof idHoKhau != "number") {
                res.status(400).send("Invalid input");
                return;
            }
            let cuocHop = await CuocHop.findOne({id: id});
            if (!cuocHop) {
                res.status(404).send("cuoc hop not found");
                return;
            }
            let hoKhau = await HoKhau.findOne({id: idHoKhau});
            if (!hoKhau) {
                res.status(404).send("ho khau not found");
                return;
            }
            if (!cuocHop.hoKhauIds.includes(idHoKhau)) {
                res.status(400).send("ho khau khong co trong cuoc hop");
                return;
            }
            let new_hoKhauIds = [];
            for (let i=0; i<cuocHop.hoKhauIds.length; i++) {
                if (cuocHop.hoKhauIds[i] != idHoKhau) {
                    new_hoKhauIds.push(cuocHop.hoKhauIds[i]);
                }
            }
            cuocHop.hoKhauIds = new_hoKhauIds;
            await DiemDanh.deleteOne({cuocHopId: id, hoKhauId: idHoKhau});
            await cuocHop.save();
            res.status(200).send({ result: null});
        } catch(err: any) {
            res.status(500).send(err.toString());
        }
    }

    public async deleteCuocHop(req: Request, res: Response) {
        try {
            let {id} = req.params;
            let cuocHop = await CuocHop.findOne({id: id});
            if (!cuocHop) {
                res.status(404).send("cuoc hop not found");
                return;
            }
            await HoatDong.create({
                id: await getNextId(HoatDong),
                time: new Date(Date.now()).toISOString(),
                mess: "Xóa cuộc họp: " + cuocHop.tieuDe,
            });
            await DiemDanh.deleteOne({cuocHopId: id});
            res.status(200).send({ result: null});
        } catch(err: any) {
            res.status(500).send(err.toString());
        }
    }

    public async thongKeCuocHop(req: Request, res: Response) {
        try {
            let {months, years} = req.query;
            let to = Number(Date.now());
            let from = Number(new Date(Number(years), Number(months), 1));
            let cuocHops = await CuocHop.find({thoiGian: {$gte: from, $lte: to}});
            let thamGia = 0, vangCoLyDo = 0, vangKhongLyDo = 0;
            for (let cuocHop of cuocHops) {
                let diemDanhs = await DiemDanh.find({cuocHopId: cuocHop.id});
                for (let diemDanh of diemDanhs) {
                    if (diemDanh.diemDanh) {
                        thamGia++;
                    } else {
                        if (diemDanh.lyDo) {
                            vangCoLyDo++;
                        } else {
                            vangKhongLyDo++;
                        }
                    }
                }
            }
            res.status(200).send({
                result: {
                    thamGia: thamGia, 
                    vangCoLyDo: vangCoLyDo, 
                    vangKhongLyDo: vangKhongLyDo,
                    cuocHops: cuocHops,
                }
            });
        } catch(err: any) {
            res.status(500).send(err.toString());
        }
    }

    public async thongKeNguoiThamGia(req: Request, res: Response) {
        try {
            let {months, years} = req.query;
            let to = Number(Date.now());
            let from = Number(new Date(Number(years), Number(months), 1));
            let cuocHops = await CuocHop.find({thoiGian: {$gte: from, $lte: to}});
            let diemDanhs = await DiemDanh.find({cuocHopId: {$in: cuocHops.map((cuocHop: any) => cuocHop.id)}});

            let thamGia: any = {};
            let vangCoPhep: any = {};
            let vangKhongPhep: any = {};    
            let listHK: any = {};
            for (let diemDanh of diemDanhs) {
                if (!listHK[diemDanh.hoKhauId]) {
                    listHK[diemDanh.hoKhauId] = 1;
                }
                if (diemDanh.diemDanh) {
                    if (!thamGia[diemDanh.hoKhauId]) {
                        thamGia[diemDanh.hoKhauId] = 1;
                    } else {
                        thamGia[diemDanh.hoKhauId]++;
                    }
                } else {
                    if (diemDanh.lyDo) {
                        if (!vangCoPhep[diemDanh.hoKhauId]) {
                            vangCoPhep[diemDanh.hoKhauId] = 1;
                        } else {
                            vangCoPhep[diemDanh.hoKhauId]++;
                        }
                    } else {
                        if (!vangKhongPhep[diemDanh.hoKhauId]) {
                            vangKhongPhep[diemDanh.hoKhauId] = 1;
                        } else {
                            vangKhongPhep[diemDanh.hoKhauId]++;
                        }
                    }
                }
            }

            let result: any[] = [];
            for (let hoKhauId of Object.keys(listHK)) {
                let hoKhau = await HoKhau.findOne({id: hoKhauId});
                if (!hoKhau) continue;
                result.push({
                    id: hoKhau.id,
                    hoTenChuHo: hoKhau.hoTenChuHo,  
                    diaChi: hoKhau.diaChi,
                    thamGia: thamGia[hoKhauId] || 0,
                    vangCoPhep: vangCoPhep[hoKhauId] || 0,
                    vangKhongPhep: vangKhongPhep[hoKhauId] || 0,
                });
            }

            res.status(200).send({
                result: result,
            });
        } catch(err: any) {
            res.status(500).send(err.toString());
        }
    }

    public async thongKeHoKhauThamGiaTheoId(req: Request, res: Response) {
        try {
            let {id} = req.params;          
            let {months, years} = req.query;
            let to = Number(Date.now());
            let from = Number(new Date(Number(years), Number(months), 1));  
            let hoKhau = await HoKhau.findOne({id: id});
            if (!hoKhau) {
                res.status(404).send("ho khau not found");
                return;
            }
            let diemDanhs = await DiemDanh.find({hoKhauId: id});
            let result: any = {
                id: id,
                hoTenChuHo: hoKhau.hoTenChuHo,  
                diaChi: hoKhau.diaChi,
                cuocHopThamGia: [],
                cuocHopVangCoLyDo: [],
                cuocHopVangKhongLyDo: [],
            }
            for (let diemDanh of diemDanhs) {
                let cuocHop = await CuocHop.findOne({id: diemDanh.cuocHopId, thoiGian: {$gte: from, $lte: to}});
                if (!cuocHop) continue;
                if (diemDanh.diemDanh) {
                    result.cuocHopThamGia.push(cuocHop);
                } else {
                    if (diemDanh.lyDo) {
                        result.cuocHopVangCoLyDo.push(cuocHop);
                    } else {
                        result.cuocHopVangKhongLyDo.push(cuocHop);
                    }
                }
            }
            res.status(200).send({
                result: result,
            });
        } catch(err: any) {
            res.status(500).send(err.toString());
        }
    }

    public async diemDanhCuocHop(req: Request, res: Response) {
        try {
            let {hoKhau, cuocHop, diemDanh, lyDo} = req.body;
            if (typeof hoKhau != "number" || typeof cuocHop != "number" || typeof diemDanh != "boolean" || typeof lyDo != "string") {
                res.status(400).send("Invalid input");
                return;
            }
            let hoKhauObj = await HoKhau.findOne({id: hoKhau});
            if (!hoKhauObj) {
                res.status(404).send("ho khau not found");
                return;
            }
            let cuocHopObj = await CuocHop.findOne({id: cuocHop});
            if (!cuocHopObj) {
                res.status(404).send("cuoc hop not found");
                return;
            }
            let diemDanhObj = await DiemDanh.findOne({hoKhauId: hoKhau, cuocHopId: cuocHop});
            if (diemDanhObj) {
                diemDanhObj.diemDanh = diemDanh;
                diemDanhObj.lyDo = lyDo;
                await diemDanhObj.save();
                res.status(200).send({
                    
                    result: {
                        hoKhau: hoKhau,
                        cuocHop: cuocHop,
                        diemDanh: diemDanh,
                        lyDo: lyDo,
                        hoTenChuHo: hoKhauObj.hoTenChuHo,
                    }
                });
            }
            let newDiemDanh: IDiemDanh = {
                id: await getNextId(DiemDanh),
                hoKhauId: hoKhau,
                cuocHopId: cuocHop,
                diemDanh: diemDanh,
                lyDo: lyDo,
            };
            await DiemDanh.create(newDiemDanh);
            res.status(200).send({
                result: {
                    hoKhau: hoKhau,
                    cuocHop: cuocHop,
                    diemDanh: diemDanh,
                    lyDo: lyDo,
                    hoTenChuHo: hoKhauObj.hoTenChuHo,
                }
            });
        } catch(err: any) {
            res.status(500).send(err.toString());
        }
    }

    public async getAllDiemDanhByCuocHop(req: Request, res: Response) {
        try {
            let {id} = req.params;
            let cuocHop = await CuocHop.findOne({id: id});
            if (!cuocHop) {
                res.status(404).send("cuoc hop not found");
                return;
            }
            let diemDanhs = await DiemDanh.find({cuocHopId: id});
            res.status(200).send({
                result: diemDanhs,
            });
        } catch(err: any) {
            res.status(500).send(err.toString());
        }
    }

    public async getAllHoKhauByCuocHop(req: Request, res: Response) {
        try {
            let {id} = req.params;
            let cuocHop = await CuocHop.findOne({id: id});
            if (!cuocHop) {
                res.status(404).send("cuoc hop not found");
                return;
            }
            let invited = await HoKhau.find({id: {$in: cuocHop.hoKhauIds}});
            let notInvited = await HoKhau.find({id: {$nin: cuocHop.hoKhauIds}});
            let result: any[] = [];
            for (let hoKhau of invited) {
                result.push({
                    id: hoKhau.id,
                    hoTenChuHo: hoKhau.hoTenChuHo,
                    invited: true,
                });
            }
            for (let hoKhau of notInvited) {
                result.push({
                    id: hoKhau.id,
                    hoTenChuHo: hoKhau.hoTenChuHo,
                    invited: false,
                });
            }
            res.status(200).send({
                result: result,
            });
        } catch(err: any) {
            res.status(500).send(err.toString());
        }
    }

    public async updateDanhSachThamGia(req: Request, res: Response) {
        try {
            let {id} = req.params;
            let {hoKhaus} = req.body;
            if (typeof id != "number" || !Array.isArray(hoKhaus)) {
                res.status(400).send("Invalid input");
                return;
            }
            if (hoKhaus.length > 0 && typeof hoKhaus[0] != "number") {
                res.status(400).send("Invalid input");
                return;
            }
            let cuocHop = await CuocHop.findOne({id: id});
            if (!cuocHop) {
                res.status(404).send("cuoc hop not found");
                return;
            }
            cuocHop.hoKhauIds = hoKhaus;
            await cuocHop.save();
            res.status(200).send({
                result: cuocHop,
            });
        } catch(err: any) {
            res.status(500).send(err.toString());
        }
    }

    public async getDanhSachMoi(req: Request, res: Response) {
        try {
            res.status(200).send({});
        } catch(err: any) {
            res.status(500).send(err.toString());
        }
    }
}