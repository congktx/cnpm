import mongoose from "mongoose";

export interface ICuocHop {
    id: number;
    tieuDe: string;
    thoiGian: Date;
    diaDiem: string;
    noiDung: string;
    banBaoCao: string;
    nguoiTao: string;
    hoKhauIds: number[];
}

const CuocHopSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    next_id: {
        type: Number,
    },
    tieuDe: {
        type: String,
    },
    thoiGian: {
        type: Date,
    },
    diaDiem: {
        type: String,
    },
    noiDung: {
        type: String,
    },
    banBaoCao: {
        type: String,
    },
    nguoiTao: {
        type: String,
    },
    hoKhauIds: {
        type: [Number],
    }
});

CuocHopSchema.index({id: 1}, {unique: true});

export default mongoose.model("CuocHop", CuocHopSchema, "cuoc_hop");