import mongoose, { Types } from "mongoose";

export interface IPhoto{
    url: string;
    user: Types.ObjectId;
    userName: string
}

const PhotoSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    userName: {
        type: String,
        required: true
    }
});

export default PhotoSchema;