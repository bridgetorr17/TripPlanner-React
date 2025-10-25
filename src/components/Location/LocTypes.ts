import { LocationType } from "../../../shared/types/Location"

export interface PlaceAutocompleteProps {
    editMode: Boolean;
    handleSelect: (selected: AutocompletePrediction) => Promise<void>;
    clearPlace: Boolean;
}

export interface CreateTripLocationAutocompleteProps {
    locations: LocationType[];
    setLocations: React.Dispatch<React.SetStateAction<LocationType[]>>;
}

export interface LocationsProps {
    editMode: Boolean;
    locations: LocationType[];
    setLocations: React.Dispatch<React.SetStateAction<LocationType[]>>;
    tripId: string;
}

export interface ZoomToArgs {
    coords: Coordinates;
    zoom: number;
}

export interface MapProps {
    locations: LocationType[];
    coords: Coordinates;
}

export type Coordinates = [number, number]

export type AutocompletePrediction =  {
    placePrediction: {
        place: string;
        placeId: string;
        structuredFormat: {
            mainText:{
                text: string;
                matches: [{}];
            },
            secondaryText?: {
                text: string;
                matches: [{}];
            }
        },
        text: {
            matches: [{}];
            text: string;
        }
        types: [String];
    }
}