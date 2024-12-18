import mongoose from "mongoose";

export interface IHoKhau {
    id: number;
    hoTenChuHo: string;
    cccdChuHo: string;
    diaChi: string;
    nhanKhauIds: number[];
}

const HoKhauSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    next_id: {
        type: Number,
    },
    hoTenChuHo: {
        type: String,
    },
    cccdChuHo: {
        type: String,
    },
    diaChi: {
        type: String,
    },
    nhanKhauIds: {
        type: [Number],
    }
});

HoKhauSchema.index({id: 1}, {unique: true});

export default mongoose.model("HoKhau", HoKhauSchema, "ho_khau");