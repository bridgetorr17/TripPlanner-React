import mongoose from 'mongoose';
import MemorySchema from "./Memory"
import PhotoSchema from "./Photo"
import LocationSchema from './Location';

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
    contributors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    locations: {
        type: [LocationSchema],
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
        type: [PhotoSchema]
    }
});

const Trip = mongoose.model('Trip', TripSchema);

export default Trip;