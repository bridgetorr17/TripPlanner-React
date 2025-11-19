import mongoose, { Types, Document } from "mongoose";
import { MemoryType } from "../../../shared/types/Memory.js"

type MemoryBase = Omit<MemoryType, "_id" | "user">
export interface IMemory extends MemoryBase, Document{
    _id: Types.ObjectId;
    user: Types.ObjectId;
}

const MemorySchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    location: {
        type: String
    }
});

export default MemorySchema;