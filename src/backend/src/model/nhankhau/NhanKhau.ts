import mongoose from "mongoose";

export const NhanKhauReq: any = {
    hoVaTen: "string",
    hoVaTenKhac: "string",
    ngaySinh: "string",
    gioiTinh: "string",
    cccd: "string",
    soHoChieu: "string",
    nguyenQuan: "string",
    danToc: "string",
    tonGiao: "string",
    quocTich: "string",
    noiThuongTru: "string",
    diaChiHienTai: "string",
    trinhDoHocVan: "string",
    ngheNghiep: "string",
    noiLamViec: "string",
    quanHeVoiChuHo: "string",
};

export interface INhanKhau {
    id: number;
    hoVaTen: string;
    tenKhac: string;
    ngaySinh: Date;
    gioiTinh: string;
    cccd: string;
    soHoChieu: string;
    nguyenQuan: string;
    danToc: string;
    tonGiao: string;
    quocTich: string;
    noiThuongTru: string;
    diaChiHienTai: string;
    tringDoHocVan: string;
    ngheNghiep: string;
    noiLamViec: string;
    quanHeVoiChuHo: string;
    isChuHo: boolean;
    idhk: number;
}

const NhanKhauSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    next_id: {
        type: Number,
    },
    hoVaTen: {
        type: String,
    },
    tenKhac: {
        type: String,
    },
    ngaySinh: {
        type: Date,
    },
    gioiTinh: {
        type: String,
    },
    cccd: {
        type: String,
    },
    soHoChieu: {
        type: String,
    },
    nguyenQuan: {
        type: String,
    },
    danToc: {
        type: String,
    },
    tonGiao: {
        type: String,
    },
    quocTich: {
        type: String,
    },
    noiThuongTru: {
        type: String,
    },
    diaChiHienTai: {
        type: String,
    },
    tringDoHocVan: {
        type: String,
    },
    ngheNghiep: {
        type: String,
    },
    noiLamViec: {
        type: String,
    },
    quanHeVoiChuHo: {
        type: String,
    },
    isChuHo: {
        type: Boolean,
    },
    idhk: {
        type: Number,
        default: 0,
    }
});

NhanKhauSchema.index({id: 1}, {unique: true});

export default mongoose.model("NhanKhau", NhanKhauSchema, "nhan_khau");