import mongoose from "mongoose";

export interface IUser {
    id: number;
    username: string;
    password: string;
    name: string;
    isDeleted: boolean;
    isActive: boolean;
}

const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    next_id: {
        type: Number,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    name: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
    },
    isActive: {
        type: Boolean,
    }
});

UserSchema.index({id: 1}, {unique: true});

export default mongoose.model("User", UserSchema, "user");