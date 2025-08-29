import { useState, useEffect } from "react"

const PlaceAutocomplete = ({editMode, handleSelect}) => {

    const [place, setPlace] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (!place) {
            setSuggestions([]);
            return;
        }
        POSTreq();
    }, [place])

    const POSTreq = async ()  => {

        const data = {
            "input": place,
            "locationBias": {
                "circle": {
                    "center": {
                        "latitude": 37.7937,
                        "longitude": -122.3965
                    },
                "radius": 500.0
                }
            }
        }

        try{
            const response = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_MAPS_API_KEY
                },
                body: JSON.stringify(data)
            })

            const result = await response.json();
            if (result.suggestions){
                setSuggestions(result.suggestions)
                console.log(result.suggestions);
            } else{
                setSuggestions([])
            }
        }
        catch(err){
            console.error("Autocomplete request failed:", error);
            setSuggestions([]);
        }
        
    }

    return (
        <>
            {editMode && (
                <div className="relative mb-2 z-30">
                    <input
                        type="text"
                        aria-autocomplete="list"
                        aria-expanded={true}
                        aria-controls="suggestion-list"
                        onChange={(e) => {setPlace(e.target.value)}}
                        placeholder="Search for a new location"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {suggestions.length > 0 && (
                        <ul
                            id="suggestion-list"
                            role="listbox"
                            className="absolute left-0 right-0 bg-white border border-gray-300 mt-1 max-h-48 overflow-y-auto z-20 rounded text-xs"
                            >
                            {suggestions.map((sug, index) => (
                                <li
                                key={index}
                                role="option"
                                onClick={() => {
                                    setPlace('');
                                    setSuggestions([]);
                                    handleSelect(sug)
                                }}
                                className="px-2 py-2 hover:bg-gray-200 cursor-pointer"
                                >
                                    {sug.placePrediction?.text?.text}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </>
    )
}

export default PlaceAutocomplete;