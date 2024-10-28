import mongoose from "mongoose";

export interface IHoatDong {
    id: number;
    time: string;
    mess: string;
}

const HoatDongSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    next_id: {
        type: Number,
    },
    time: {
        type: String,
        required: true
    },
    mess: {
        type: String,
        required: true
    }
});

HoatDongSchema.index({id: 1}, {unique: true});

export default mongoose.model("HoatDong", HoatDongSchema, "hoat_dong");