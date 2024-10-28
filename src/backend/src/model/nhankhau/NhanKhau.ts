import mongoose from "mongoose";

export const ValueKeyNhanKhau: any = {
    hoVaTen: "string",
    tenKhac: "string",
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
    tringDoHocVan: "string",
    ngheNghiep: "string",
    noiLamViec: "string",
    quanHeVoiChuHo: "string",
    isChuHo: "boolean"
};

export interface INhanKhau {
    id: number;
    hoVaTen: string;
    tenKhac: string;
    ngaySinh: string;
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
        required: true
    },
    next_id: {
        type: Number,
    },
    hoVaTen: {
        type: String,
        required: true
    },
    tenKhac: {
        type: String,
        required: true
    },
    ngaySinh: {
        type: String,
        required: true
    },
    gioiTinh: {
        type: String,
        required: true
    },
    cccd: {
        type: String,
        required: true
    },
    soHoChieu: {
        type: String,
        required: true
    },
    nguyenQuan: {
        type: String,
        required: true
    },
    danToc: {
        type: String,
        required: true
    },
    tonGiao: {
        type: String,
        required: true
    },
    quocTich: {
        type: String,
        required: true
    },
    noiThuongTru: {
        type: String,
        required: true
    },
    diaChiHienTai: {
        type: String,
        required: true
    },
    tringDoHocVan: {
        type: String,
        required: true
    },
    ngheNghiep: {
        type: String,
        required: true
    },
    noiLamViec: {
        type: String,
        required: true
    },
    quanHeVoiChuHo: {
        type: String,
        required: true
    },
    isChuHo: {
        type: Boolean,
        required: true
    },
    idhk: {
        type: Number,
        required: true
    }
});

NhanKhauSchema.index({id: 1}, {unique: true});

export default mongoose.model("NhanKhau", NhanKhauSchema, "nhan_khau");