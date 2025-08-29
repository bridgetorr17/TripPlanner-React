import { useCallback, useRef, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";


const libraries = ['places']
const googleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const Map = ({center}) => {

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: googleMapsKey,
        libraries
    });

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, [])

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={center}
            zoom={10}
            onLoad={onMapLoad}>
        </GoogleMap>
    )
}

export default Map;