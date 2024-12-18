import mongoose from "mongoose";

export interface IAuthToken {
    id: number;
    accessToken: string;
    createdAt: Date;
    updatedAt: Date;
    expireIn: Date;
    userId: number;
}

const AuthTokenSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    next_id: {
        type: Number,
    },
    accessToken: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
    expireIn: {
        type: Date,
    },
    userId: {
        type: Number,
    }
});

AuthTokenSchema.index({id: 1}, {unique: true});

export default mongoose.model("AuthToken", AuthTokenSchema, "auth_token");