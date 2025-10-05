import mongoose, { Types, Document } from "mongoose";

export interface IPhoto extends Document{
    url: string;
    user: Types.ObjectId;
    userName: string
}

const PhotoSchema = new mongoose.Schema<IPhoto>({
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