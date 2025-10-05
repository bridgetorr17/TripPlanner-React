import mongoose, { Types } from "mongoose";

export interface IMemory{
    text: string;
    user: Types.ObjectId;
    location: string;
}

const MemorySchema = new mongoose.Schema<IMemory>({
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