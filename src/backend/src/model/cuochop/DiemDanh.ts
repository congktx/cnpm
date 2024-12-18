import mongoose from "mongoose";

export interface IDiemDanh {
    id: number;
    hoKhauId: number;
    cuocHopId: number;
    diemDanh: boolean;
    lyDo: string;
}

const DiemDanhSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    next_id: {
        type: Number,
    },
    hoKhauId: {
        type: Number,
    },
    cuocHopId: {
        type: Number,
    },
    diemDanh: {
        type: Boolean,
    },
    lyDo: {
        type: String,
    }
});

DiemDanhSchema.index({id: 1}, {unique: true});

export default mongoose.model("DiemDanh", DiemDanhSchema, "diem_danh");