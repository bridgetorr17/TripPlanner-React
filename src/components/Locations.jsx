import Map from "./Map";
import List from "./List";
import { useState } from "react";
import PlaceAutocomplete from "./PlaceAutocomplete";

const Locations = ({editMode, locations, setLocations}) => {

    const [newPlace, setNewPlace] = useState(null);
    const [coords, setCoords] = useState({lat: 40.7128, lng: -74.0060});

    const selectNewPlace = async (selectedPlace) => {
        setNewPlace(selectedPlace);

        console.log(selectedPlace)

        const placeId = selectedPlace.placePrediction.placeId;

        const response = await fetch( `https://places.googleapis.com/v1/places/${placeId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
                    "X-Goog-FieldMask": "location"
                },
            }
        );

        const result = await response.json();
        setCoords({
            lat: result.location?.latitude,
            lng: result.location?.longitude
        })
    }

    return (
        <div className="space-y-4 p-4 bg-sky-50 rounded-md">
            <div className="flex flex-row justify-around items-stretch space-x-4">
                <div className="flex-1 p-4">
                    <div className="flex-1 h-full">
                        <List arr={locations} links={false} />
                    </div>
                    {newPlace && (
                        <div>
                            {newPlace.placePrediction?.structuredFormat?.mainText?.text}
                        </div>
                    )}
                </div>
                <div className="flex-1 flex flex-col p-2 rounded shadow-sm relative h-[200px]">
                        <PlaceAutocomplete 
                            editMode={editMode}
                            handleSelect={selectNewPlace}/>
                        <Map 
                            center={coords}/>
                </div>
            </div>
        </div>
    )
}

export default Locations;