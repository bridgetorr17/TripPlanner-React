import { useRef } from "react";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { LatLngBoundsExpression } from "leaflet"
import { ZoomToArgs, MapProps, Coordinates } from "./LocationTypes";

const ZoomTo = ({ coords, zoom }: ZoomToArgs) => {
    const map = useMap();
    useEffect(() => {
        if (coords?.[0] != null && coords?.[1] != null) {
            map.setView(coords, zoom, { animate: true });
        }
    }, [coords, zoom, map]);
    return null;
};

const Map = ({locations, coords}: MapProps) => {
    const mapRef = useRef<L.Map | null>(null);
    const [centerCoords, setCenterCoords] = useState<Coordinates>(coords);
    const [zoom, setZoom] = useState<number>(2);

    useEffect(() => { 
        setCenterCoords(coords) 
        if (locations[0]) setZoom(13) 
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
        ] as LatLngBoundsExpression;

        leafletMap.fitBounds(bounds, { padding: [50, 50], animate: true })
    }
    
    return (
        <>
            <div className="flex-1 flex flex-col h-full z-0">
                <button
                    onClick={seeAllMarkers}
                    className="bg-blue-500 text-white text-xs mb-1 px-3 py-1 rounded shadow hover:bg-blue-600 transition duration-200">
                    See all places
                </button>
                <div className="flex flex-1 w-full">
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
                                <ZoomTo coords={centerCoords} zoom={zoom} />
                    </MapContainer>
                </div>
            </div>
        </>
    )
}

export default Map;