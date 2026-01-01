import { DestinationProps, Coordinates } from "./LocationTypes";
import { LocationType } from "../../../shared/types/Location";
import Map from "./Map";
import { useState } from "react";

const Destinations = ({editMode, destinations, setDestinations, tripId}: DestinationProps) => {

    console.log(destinations);
    const [selectedDest, setSelectedDest] = useState<number | null>(null);
    const [mapLocations, setMapLocations] = useState<LocationType[]>(destinations.map(dest => ({
        name: dest.name,
        coordinates: dest.coordinates
    })));
    const [coords, setCoords] = 
            useState<Coordinates>((destinations[0] === undefined)
                ? [38.7946, -100.534]
                : [destinations[0].coordinates?.latitude, destinations[0].coordinates?.longitude]
        );

    return (
        <div className="flex flex-col sm:flex-row justify-around items-stretch space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="w-full sm:w-1/3 bg-white border border-gray-200 rounded shadow-sm p-4 overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Destinations</h2>
                {destinations.map((dest, ind) => (
                    <div key={ind}>
                        <div
                            onClick={() => {
                            setSelectedDest(ind === selectedDest ? null : ind);
                            setMapLocations(dest.locations);
                            setCoords([dest.coordinates.latitude, dest.coordinates.longitude]);
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
                <Map locations={mapLocations} coords={coords} />
            </div>
        </div>
    )
}

export default Destinations;