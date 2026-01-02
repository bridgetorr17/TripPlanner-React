import mongoose, {Types, Document} from "mongoose";
import LocationSchema, { ILocation }  from "./Location.js";

export interface IDestination extends ILocation{
    locations: Types.DocumentArray<ILocation>
}

const DestinationSchema = new mongoose.Schema({
    name: {
        mainText: { type: String, required: true},
        secondaryText: { type: String },
    },
    coordinates: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    locations: {
        type: [LocationSchema],
        required: true
    }
});

export default DestinationSchema;