import mongoose, { Types, Document } from "mongoose";

export interface IResetToken extends Document{
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    token: string;
    createdAt: Date;
}

const ResetTokenSchema = new mongoose.Schema<IResetToken>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 15 * 60,
    }
});

const ResetToken = mongoose.model<IResetToken>('ResetToken', ResetTokenSchema);

export default ResetToken;