export type LocationType = {
    _id?: string;
    name: {
        mainText: string;
        secondaryText?: string;
    };
    coordinates: {
        latitude: number;
        longitude: number;
    };
}