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
        required: true
    },
    next_id: {
        type: Number,
    },
    hoTenChuHo: {
        type: String,
        required: true
    },
    cccdChuHo: {
        type: String,
        required: true
    },
    diaChi: {
        type: String,
        required: true
    },
    nhanKhauIds: {
        type: [Number],
        required: true
    }
});

HoKhauSchema.index({id: 1}, {unique: true});

export default mongoose.model("HoKhau", HoKhauSchema, "ho_khau");