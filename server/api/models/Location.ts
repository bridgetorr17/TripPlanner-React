import mongoose, { Document, Types } from "mongoose";

export interface ILocation extends Document{
    _id: Types.ObjectId;
    name: {
        mainText: string;
        secondaryText: string;
    };
    coordinates: {
        latitude: number;
        longitude: number;
    };
}

const LocationSchema = new mongoose.Schema<ILocation>({
    name: {
        type: {
            mainText: String,
            secondaryText: String
        },
        required: true
    },
    coordinates: {
        type: {
            latitude: Number,
            longitude: Number
        }
    }
});

export default LocationSchema;