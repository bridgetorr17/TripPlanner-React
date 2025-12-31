import mongoose, {Types, Document} from "mongoose";
import LocationSchema from "./Location.js";

export interface IDestination extends Document{
    _id: Types.ObjectId;
}

const DestinationSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    locations: {
        type: [LocationSchema],
        required: true
    }
}, {timestamps: true});

export default DestinationSchema;