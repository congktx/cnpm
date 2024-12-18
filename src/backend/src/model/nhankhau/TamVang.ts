import mongoose from "mongoose";

export interface ITamVang {
    id: number;
    hoVaTen: string;
    cccd: string;
    diaChi: string;
    tuNgay: Date;
    denNgay: Date;
    lyDo: string;
}

const TamVangSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    next_id: {
        type: Number,
    },
    hoVaTen: {
        type: String,
    },
    cccd: {
        type: String,
    },
    diaChi: {
        type: String,
    },
    tuNgay: {
        type: Date,
    },
    denNgay: {
        type: Date,
    },
    lyDo: {
        type: String,
    }
});

TamVangSchema.index({id: 1}, {unique: true});

export default mongoose.model("TamVang", TamVangSchema, "tam_vang");