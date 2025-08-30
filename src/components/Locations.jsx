import Map from "./Map";
import List from "./List";
import { useState } from "react";
import PlaceAutocomplete from "./PlaceAutocomplete";

const Locations = ({editMode, locations, setLocations, tripId}) => {

    const [newPlace, setNewPlace] = useState(null);
    const [coords, setCoords] = useState({lat: 40.7128, lng: -74.0060});

    const selectNewPlace = async (selectedPlace) => {

        setNewPlace(selectedPlace);
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

    const addLocation = async () => {
        const addPlace = {
            name: {
                mainText: newPlace.placePrediction.structuredFormat.mainText.text,
                secondaryText: newPlace.placePrediction.structuredFormat.secondaryText.text,
            },
            coordinates: {
                latitude: coords.lat,
                longitude: coords.lng
            }
        }

        try{
            const res = await fetch(`/api/trips/addPlace/${tripId}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addPlace)
            });

            const created = await res.json();
            setLocations(prev => [...prev, created])
        }
        catch(err){
            console.log(err);
        }
        finally{
        }
    }

    return (
        <div className="space-y-4 p-4 bg-sky-50 rounded-md">
            <div className="flex flex-row justify-around items-stretch space-x-4">
                <div className="flex-1 p-4">
                    <div className="flex-1 h-full">
                        {locations.map((el, ind) => <li key={ind}> {el.name.mainText} </li>)}
                    </div>
                    {newPlace && (
                        <div>
                            {newPlace.placePrediction?.structuredFormat?.mainText?.text}
                            <button
                                className="w-full flex justify-center items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition"
                                onClick={addLocation}>
                                Add this Location
                            </button>
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