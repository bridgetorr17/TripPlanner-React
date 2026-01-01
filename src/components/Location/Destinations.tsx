import { DestinationProps, AutocompletePrediction, Coordinates } from "./LocationTypes";
import { LocationType } from "../../../shared/types/Location";
import Map from "./Map";
import PlaceAutocomplete from "./PlaceAutocomplete";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Destinations = ({editMode, destinations, setDestinations, tripId}: DestinationProps) => {

    const [selectedDest, setSelectedDest] = useState<number | null>(null);
    const [newPlace, setNewPlace] = useState<AutocompletePrediction | null>(null);
    const [newPlaceCoords, setNewPlaceCoords] = useState<Coordinates>([0,0]);
    const [newPlaceType, setNewPlaceType] = useState<'destination' | 'location'>('destination')
    const [mapLocations, setMapLocations] = useState<LocationType[]>(destinations.map(dest => ({
        name: dest.name,
        coordinates: dest.coordinates
    })));
    const [coords, setCoords] = 
            useState<Coordinates>((destinations[0] === undefined)
                ? [38.7946, -100.534]
                : [destinations[0].coordinates?.latitude, destinations[0].coordinates?.longitude]
        );
    const navigate = useNavigate();

    const selectNewPlace = async (selectedPlace: AutocompletePrediction) => {
        setNewPlace(selectedPlace);
        console.log(selectedPlace);
        const placeId = selectedPlace.placePrediction.placeId;
        try {
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
            setCoords([result.location?.latitude, result.location?.longitude]);
            setNewPlaceCoords([result.location?.latitude, result.location?.longitude])
        } 
        catch (err) {
            console.log(err);
            navigate('/errorpage')
        }
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-around items-stretch space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="w-full sm:w-1/3 bg-white border border-gray-200 rounded shadow-sm p-4 overflow-y-auto">
                    {destinations.map((dest, ind) => (
                        <div key={ind}>
                            <div
                                onClick={() => {
                                    setSelectedDest(ind === selectedDest ? null : ind);
                                    setMapLocations(dest.locations);
                                }}
                                className={`cursor-pointer px-3 py-2 rounded transition-all duration-200${selectedDest === ind ? "bg-blue-100 font-bold text-lg text-blue-700" : "hover:bg-gray-100 text-gray-800"}`}>
                                    {dest.name.mainText}
                            </div>
                            {selectedDest === ind && (
                                <div className="mt-2 ml-5 space-y-1 transition-all duration-300">
                                    {dest.locations.map((loc, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() =>
                                                setCoords([loc.coordinates.latitude, loc.coordinates.longitude])
                                            }
                                            className="cursor-pointer text-sm text-gray-700 px-3 py-1 rounded hover:bg-gray-100"
                                            >
                                                {loc.name.mainText}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    
                </div>
                <div className="sm:flex-1 flex flex-col p-2 rounded shadow-sm relative h-64 sm:h-[250px] md:h-[350px]">
                    <PlaceAutocomplete 
                        editMode={editMode}
                        handleSelect={selectNewPlace}
                        clearPlace={true}/>
                    <Map locations={mapLocations} coords={coords} />
                </div>
            </div>
            <div>
                {newPlace && editMode && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-300 rounded-lg">
                        <div className="mb-3 text-lg font-semibold text-green-800">
                            <span 
                                className="inline-block transform hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer"
                                onClick={() => setCoords([...newPlaceCoords])}>
                                {newPlace.placePrediction?.structuredFormat?.mainText?.text}
                            </span>
                        </div>
                        <div className="mb-3 text-sm font-medium text-green-800">
                            {newPlace.placePrediction?.structuredFormat?.secondaryText?.text}
                        </div>
                        {(selectedDest !== null) && 
                            <div>
                                <button
                                    className="w-full flex justify-center items-center gap-2 bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-white text-base font-semibold py-1 rounded-lg transition"
                                    //onClick={addLocation}
                                    >
                                    Add this location to {destinations[selectedDest].name.mainText}
                                </button>
                                <div className="flex items-center justify-center text-gray-500 font-medium">
                                    <span className="px-2 bg-green-50 text-gray-600">or</span>
                                </div>
                            </div>
                        }
                        <button
                            className="w-full flex justify-center items-center gap-2 bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-white font-semibold py-1 rounded-lg transition"
                            //onClick={addLocation}
                            >
                            Add as new destination
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Destinations;