import mongoose from "mongoose";

export interface ITamVang {
    id: number;
    hoVaTen: string;
    cccd: string;
    diaChi: string;
    tuNgay: string;
    denNgay: string;
    lyDo: string;
}

const TamVangSchema = new mongoose.Schema({
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
    cccd: {
        type: String,
        required: true
    },
    diaChi: {
        type: String,
        required: true
    },
    tuNgay: {
        type: String,
        required: true
    },
    denNgay: {
        type: String,
        required: true
    },
    lyDo: {
        type: String,
        required: true
    }
});

TamVangSchema.index({id: 1}, {unique: true});

export default mongoose.model("TamVang", TamVangSchema, "tam_vang");