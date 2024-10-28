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
        required: true
    },
    next_id: {
        type: Number,
    },
    hoKhauId: {
        type: Number,
        required: true
    },
    cuocHopId: {
        type: Number,
        required: true
    },
    diemDanh: {
        type: Boolean,
        required: true
    },
    lyDo: {
        type: String,
        required: true
    }
});

DiemDanhSchema.index({id: 1}, {unique: true});

export default mongoose.model("DiemDanh", DiemDanhSchema, "diem_danh");