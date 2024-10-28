import mongoose from "mongoose";

export interface ICuocHop {
    id: number;
    tieuDe: string;
    thoiGian: string;
    diaDiem: string;
    noiDung: string;
    banBaoCao: string;
    nguoiTao: string;
    hoKhauIds: number[];
}

const CuocHopSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    next_id: {
        type: Number,
    },
    tieuDe: {
        type: String,
        required: true
    },
    thoiGian: {
        type: String,
        required: true
    },
    diaDiem: {
        type: String,
        required: true
    },
    noiDung: {
        type: String,
        required: true
    },
    banBaoCao: {
        type: String,
        required: true
    },
    nguoiTao: {
        type: String,
        required: true
    },
    hoKhauIds: {
        type: [Number],
        required: true
    }
});

CuocHopSchema.index({id: 1}, {unique: true});

export default mongoose.model("CuocHop", CuocHopSchema, "cuoc_hop");