import { useRef, useEffect } from 'react';

const SearchBox = ({ onSelect }) => {
    const inputRef = useRef(null);
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
        <div className="w-full mb-4">
            <gmpx-place-autocomplete ref={inputRef} class="w-full">
                <input
                placeholder="Search for places"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </gmpx-place-autocomplete>
        </div>
    );
}

export default SearchBox