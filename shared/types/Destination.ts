import { LocationType } from "./Location.js";

export type DestinationType = {
    _id: string;
    name: {
        mainText: string;
        secondaryText?: string;
    };
    coordinates: {
        latitude: number;
        longitude: number;
    };
    locations: LocationType[];
}