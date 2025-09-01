import { useRef } from "react";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

const Recenter = ({coords}) => {
    const map = useMap();

    useEffect(() => {
        if (coords[0] && coords[1]) {
            map.setView(coords)
        }
    }, [coords, map]);

    return null
}

const Map = ({locations, coords}) => {


    console.log(`the new center coords are ${coords[0]} ${coords[1]}`)
    const mapRef = useRef(null);
    const [centerCoords, setCenterCoords] = useState(coords);
    const [zoom, setZoom] = useState(13);


    useEffect(() => {
        setCenterCoords(coords)
        setZoom(13)
    }, [coords])

    const seeAllMarkers = () => {
        const map = mapRef.current;
        if (!map) return;

        const leafletMap = map;

        if (!locations || locations.length === 0) return;

        let minLat = Infinity,
            maxLat = -Infinity,
            minLng = Infinity,
            maxLng = -Infinity;

        locations.forEach(loc => {
            const { latitude, longitude } = loc.coordinates;
            if (latitude < minLat) minLat = latitude;
            if (latitude > maxLat) maxLat = latitude;
            if (longitude < minLng) minLng = longitude;
            if (longitude > maxLng) maxLng = longitude;
        });

        const bounds = [
            [minLat, minLng],
            [maxLat, maxLng]
        ];

        leafletMap.fitBounds(bounds, { padding: [50, 50], animate: true })
    }
    
    return (
        <>
            <MapContainer
                center={centerCoords}
                zoom={zoom}
                ref={mapRef}
                className="h-full w-full">
                    <TileLayer 
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                        {locations.map((loc, idx) => {
                            return (
                                <Marker
                                    key={`${loc.coordinates?.latitude}-${loc.coordinates?.longitude}-${idx}`}
                                    position={[loc.coordinates?.latitude, loc.coordinates?.longitude]}>
                                    <Popup>{loc.name?.mainText}</Popup>
                                </Marker>
                            )
                        })}
                        <Recenter coords={centerCoords}/>
            </MapContainer>
            <span
                onClick={seeAllMarkers}
                className="mt-2 inline-block cursor-pointer text-blue-600 hover:underline">
                See all places
            </span>
        </>
    )
}

export default Map;