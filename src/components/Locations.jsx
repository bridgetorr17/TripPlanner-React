import Map from "./Map";
import List from "./List";
import DynamicListInput from "./DynamicListInput";
import PlaceAutocomplete from "./PlaceAutocomplete";

const Locations = ({editMode, locations, setLocations}) => {

    return (
        <div className="space-y-4 p-4 bg-sky-50 rounded-md">
            <div className="flex flex-row justify-around items-stretch space-x-4">
                {editMode ? 
                    <div className="flex-1 p-4">
                        <div className="flex-1 h-full">
                            <DynamicListInput 
                                label='Stop' 
                                values={locations} 
                                setValues={setLocations} 
                                name='locations'
                                color='blue'
                            />
                        </div>
                    </div>
                    :   <div className="flex-1 p-4">
                            <div className="flex-1 h-full">
                                <List arr={locations} links={false} />
                            </div>
                        </div>}
                <div className="flex-1 flex flex-col p-2 rounded shadow-sm relative h-[200px]">
                        <PlaceAutocomplete />
                        <Map />
                </div>
            </div>
        </div>
    )
}

export default Locations;