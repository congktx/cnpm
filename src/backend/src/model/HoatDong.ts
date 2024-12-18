import mongoose from "mongoose";

export interface IHoatDong {
    id: number;
    time: Date;
    mess: string;
}

const HoatDongSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    next_id: {
        type: Number,
    },
    time: {
        type: Date,
    },
    mess: {
        type: String,
    }
});

HoatDongSchema.index({id: 1}, {unique: true});

export default mongoose.model("HoatDong", HoatDongSchema, "hoat_dong");