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
        <>
            <div>
                {(destinations.map((dest, ind) => {
                        return (
                            <div key={ind} onClick={() => {
                                    setSelectedDest(ind);
                                    setMapLocations(dest.locations);
                                    setCoords([dest.coordinates.latitude, dest.coordinates.longitude])
                                }}>
                                {dest.name.mainText}
                            </div>
                        )}))}
            </div>
            <div>
                {selectedDest !== null ? (
                    destinations[selectedDest].locations.map(loc => (
                        <div onClick={() => setCoords([loc.coordinates.latitude, loc.coordinates.longitude])}>
                            {loc.name.mainText}
                        </div>
                    ))) 
                    : (<div>Select a destination</div>)}
            </div>
            <div className="sm:flex-1 flex flex-col p-2 rounded shadow-sm relative h-64 md:h-[200px]">
                <Map 
                    locations={mapLocations}
                    coords={coords}/>
            </div>
        </>
    )
}

export default Destinations;