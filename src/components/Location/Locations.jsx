import Map from "./Map";
import { useState, useEffect } from "react";
import PlaceAutocomplete from "./PlaceAutocomplete";
import { FaTrash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Locations = ({editMode, locations, setLocations, tripId}) => {

    const [newPlace, setNewPlace] = useState(null);
    const [newPlaceCoords, setNewPlaceCoords] = useState([])
    const [coords, setCoords] = 
        useState(locations[0] 
            ? [locations[0].coordinates.latitude, locations[0].coordinates.longitude]
            : [38.7946, -100.534]
    )
    const navigate = useNavigate();

    useEffect(() => {
        setNewPlace(null);
        setCoords([locations[0].coordinates.latitude, locations[0].coordinates.longitude])
    }, [editMode])
    
    const selectNewPlace = async (selectedPlace) => {
        setNewPlace(selectedPlace);
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

    const addLocation = async () => {
        const addPlace = {
            name: {
                mainText: newPlace.placePrediction.structuredFormat.mainText?.text,
                secondaryText: newPlace.placePrediction.structuredFormat.secondaryText?.text,
            },
            coordinates: {
                latitude: coords[0],
                longitude: coords[1]
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
        catch {
            console.log(err);
            navigate('/errorpage')
        }
        finally{
            setNewPlace(null);
        }
    }

    const deleteLocation = async (id) => {

        const locationId = {
            id: id
        }

        try{
            const res = await fetch(`/api/trips/deleteLocation/${tripId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(locationId)
            });

            const updatedLocations = await res.json();
            setLocations(updatedLocations);
        }
        catch(err){
            navigate('/errorpage')
            console.log(err);
        }
    }

    return (
        <div className="space-y-4 p-4 bg-sky-50 rounded-md">
            <div className="flex flex-col sm:flex-row justify-around items-stretch space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1 p-4">
                    <ul className="space-y-1 text-gray-800">
                        {locations.map((el, ind) => (
                            <li 
                                key={ind} 
                                className="flex items-center justify-between px-1 py-1 transform hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer"
                                onClick={() => setCoords([ el.coordinates.latitude, el.coordinates.longitude ])}>
                                <div className="flex items-center space-x-2">
                                    <span className="font-medium">{el.name.mainText}</span>
                                </div>
                                { editMode && (
                                    <span 
                                        className="text-red-500 hover:text-red-700 focus:outline-none"
                                        onClick={() => deleteLocation(el._id)}>
                                        <FaTrash />
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                    {newPlace && editMode && (
                        <div className="mt-4 p-4 bg-green-50 border border-green-300 rounded-lg">
                            <div className="mb-3 text-lg font-semibold text-green-800">
                                <span 
                                    className="inline-block transform hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer"
                                    onClick={() => setCoords([...newPlaceCoords])}>
                                    {newPlace.placePrediction?.structuredFormat?.mainText?.text}
                                </span>
                            </div>
                            <div className="mb-3 text-md font-medium text-green-800">
                                {newPlace.placePrediction?.structuredFormat?.secondaryText?.text}
                            </div>
                            <button
                                className="w-full flex justify-center items-center gap-2 bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-white font-semibold py-3 rounded-lg transition"
                                onClick={addLocation}>
                                Add this Location
                            </button>
                        </div>
                    )}
                </div>
                <div className="sm:flex-1 flex flex-col p-2 rounded shadow-sm relative h-64 md:h-[200px]">
                        <PlaceAutocomplete 
                            editMode={editMode}
                            handleSelect={selectNewPlace}/>
                        <Map 
                            locations={locations}
                            coords={coords}/>
                </div>
            </div>
        </div>
    )
}

export default Locations;