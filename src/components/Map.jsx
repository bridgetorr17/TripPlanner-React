import { useCallback, useRef, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import SearchBox from "./SearchBox";

const containerStyle = {
    width: '100%',
    height: '600px'
}

const center = {
    lat: 40.7128,
    lng: -74.0060
}

const libraries = ['places']
const googleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const Map = () => {

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: googleMapsKey,
        libraries
    });

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, [])

    const [markers, setMarkers] = useState([]);

    const handleAddMarker = (location) => {
        setMarkers((prev) => [...prev, location]);
        mapRef.current.panTo(location);
        mapRef.current.setZoom(15);
    }

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="flex flex-col h-full w-full space-y-2">
            <SearchBox onSelect={handleAddMarker} />
            <div className="flex-1 rounded-md overflow-hidden shadow">
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={center}
                    zoom={10}
                    onLoad={onMapLoad}>
                    {markers.map((loc, ind) => (
                        <Marker key={ind} position={loc} />
                    ))}
                </GoogleMap>
            </div>
        </div>
    )
}

export default Map;