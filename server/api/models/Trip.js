import mongoose from 'mongoose';

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

const TripSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    subtitle:{
        type: String,
        default: ''
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    contributors: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    locations: {
        type: [String],
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    memories: {
        type: [MemorySchema]
    },
    photos: {
        type: [String]
    }
});

const Trip = mongoose.model('Trip', TripSchema);

export default Trip;