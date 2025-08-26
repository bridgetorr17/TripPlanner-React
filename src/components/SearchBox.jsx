import { useRef, useEffect } from 'react';
import { APILoader, PlacePicker } from '@googlemaps/extended-component-library/react';

const SearchBox = ({ onSelect, googleMapsKey}) => {

    const inputRef = useRef(null);
    const placesLibrary = useMapsLibrary('places')
    const pickerRef = useRef(null);
    const [apiLoaded, setApiLoaded] = useState(false)

    useEffect(() => {
        const el = inputRef.current;

        if (!el) return;

        const handlePlaceChange = (event) => {
            const place = event.target.getPlace();

            if (!place.geometry) return;

            const location = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            };

            onSelect(location);
        };

        el.addEventListener('place_changed', handlePlaceChange);

        return () => {el.removeEventListener('place_changed', handlePlaceChange)};
    }, [onSelect]);

  return (
    <>
      <APILoader
        apiKey={googleMapsKey}
        version="beta"
        onLoad={() => setApiLoaded(true)}
      />
      {apiLoaded && (
        <PlacePicker
          ref={pickerRef}
          placeholder="Enter a place"
          onPlaceChange={() => {
            const place = pickerRef.current?.value;
            if (place?.geometry?.location) {
              onSelect({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              });
            }
          }}
        />
      )}
    </>
  );
}

export default SearchBox