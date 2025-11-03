import mongoose, { Types, Document } from "mongoose";
import { PhotoType } from "../../../shared/types/Photo.js"

type PhotoBase = Omit<PhotoType, "_id" | "user">
export interface IPhoto extends PhotoBase, Document{
    _id: Types.ObjectId;
    url: string;
    user: {
        _id: Types.ObjectId;
        userName: string
    }
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
    }
});

export default PhotoSchema;