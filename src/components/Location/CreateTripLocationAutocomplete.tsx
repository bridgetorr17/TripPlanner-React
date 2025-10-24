import { FaTrash } from "react-icons/fa"
import PlaceAutocomplete from "./PlaceAutocomplete";
import { useNavigate } from "react-router-dom";
import { CreateTripLocationAutocompleteProps, AutocompletePrediction } from "./LocTypes";
import { LocationType } from "../../../shared/types/Location"

const CreateTripLocationAutocomplete = ({ locations, setLocations }: CreateTripLocationAutocompleteProps) => {
    const navigate = useNavigate()
    const handleSelect = async (selected) => {
        const placeId = selected.placePrediction.placeId;
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
            const created = {
                name: {
                    mainText: selected.placePrediction.structuredFormat.mainText?.text,
                    secondaryText: selected.placePrediction.structuredFormat.secondaryText?.text,
                },
                coordinates: {
                    latitude: result.location?.latitude,
                    longitude: result.location?.longitude
                }
            } as LocationType;
            
            setLocations(prev => [...prev, created])
        } 
        catch {
            navigate('/errorpage')
        }
    }

    return (
        <div className={`space-y-2 bg-blue-50 p-4 rounded-md`}>
            <h3 className="text-lg font-semibold text-cyan-700">Stop's along the way</h3>
            {locations.map((val, ind) => {
                return (
                    <div key={ind} className="flex items-center space-x-2 w-full">
                        <div className="w-full">
                            <PlaceAutocomplete 
                                editMode={true}
                                handleSelect={(selected) => handleSelect(selected)}
                                clearPlace={false}/>
                        </div>
                        {locations.length > 1 && (
                            <button 
                                type="button" 
                                onClick={() => setLocations(prev => prev.filter((val, i) => i !== ind))}
                                className="text-red-600 hover:text-red-800"
                            >
                                <FaTrash />
                            </button>
                        )}
                    </div>)
            })}
            <button 
                type="button" 
                onClick={() => setLocations(prev => [...prev, {}])}
                className={`text-blue-600 hover:text-blue-800 font-semibold mt-2`}
            > + Add Stop</button>
        </div>
    )
}

export default CreateTripLocationAutocomplete