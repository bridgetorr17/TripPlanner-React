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

    console.log(`the coords are ${coords.lat}`)
    const mapRef = useRef(null);
    const [centerCoords, setCenterCoords] = useState([coords.lat, coords.lng]);
    const [zoom, setZoom] = useState(13);
    
    return (
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
    )
}

export default Map;