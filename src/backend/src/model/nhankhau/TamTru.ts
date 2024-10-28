import mongoose from "mongoose";

export interface ITamTru {
    id: number;
    hoVaTen: string;
    cccd: string;
    diaChi: string;
    tuNgay: string;
    denNgay: string;
    lyDo: string;
}

const TamTruSchema = new mongoose.Schema({
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

TamTruSchema.index({id: 1}, {unique: true});

export default mongoose.model("TamTru", TamTruSchema, "tam_tru");