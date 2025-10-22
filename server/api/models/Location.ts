import mongoose, { Document, Types } from "mongoose";
import { LocationType } from "../../../shared/types/Location"

type LocationBase = Omit<LocationType, "_id">
export interface ILocation extends LocationBase, Document{
    _id: Types.ObjectId;
}

const LocationSchema = new mongoose.Schema<ILocation>({
    name: {
        mainText: { type: String, required: true},
        secondaryText: { type: String },
    },
    coordinates: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    }
});

export default LocationSchema;