import mongoose from "mongoose";

export interface IAuthToken {
    id: number;
    accessToken: string;
    createdAt: string;
    updatedAt: string;
    expireIn: string;
    userId: number;
}

const AuthTokenSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    next_id: {
        type: Number,
    },
    accessToken: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        required: true
    },
    updatedAt: {
        type: Number,
        required: true
    },
    expireIn: {
        type: Number,
        required: true
    },
    userId: {
        type: Number,
        required: true
    }
});

AuthTokenSchema.index({id: 1}, {unique: true});

export default mongoose.model("AuthToken", AuthTokenSchema, "auth_token");