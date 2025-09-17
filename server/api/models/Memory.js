import mongoose from "mongoose";

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
    // userName: {
    //     type: String,
    //     required: true
    // },
    // userProfilePicture: {
    //     type: String,
    //     required: true
    // },
    location: {
        type: String
    }
});

export default MemorySchema;