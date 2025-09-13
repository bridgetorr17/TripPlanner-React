import mongoose from "mongoose";

const ResetTokenSchema = new mongoose.Schema({
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

const ResetToken = mongoose.model('ResetToken', ResetTokenSchema);

export default ResetToken;