import mongoose, { Document, Types } from 'mongoose';
import MemorySchema, { IMemory } from "./Memory"
import PhotoSchema, { IPhoto }  from "./Photo"
import LocationSchema, { ILocation }  from './Location';

export interface ITrip extends Document {
    _id: Types.ObjectId;
    name: String;
    subtitle?: String;
    owner: Types.ObjectId;
    contributors: Types.ObjectId[];
    locations: Types.DocumentArray<ILocation>;
    month: "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December";
    year: number;
    memories: Types.DocumentArray<IMemory>;
    photos: Types.DocumentArray<IPhoto>;
}

const TripSchema = new mongoose.Schema<ITrip>({
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
        type: Number,
        required: true
    },
    memories: {
        type: [MemorySchema],
        default: []
    },
    photos: {
        type: [PhotoSchema],
        default: []
    }
});

const Trip = mongoose.model<ITrip>('Trip', TripSchema);

export default Trip;