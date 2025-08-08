import mapPlaceholder from "../photos/mapPlaceholder.png"
import List from "./List";
import DynamicListInput from "./DynamicListInput";

const Locations = ({editMode, locations, setLocations}) => {

    return (
        <div className="space-y-4 p-4 bg-sky-50 rounded-md">
            <div className="flex flex-row justify-center items-stretch space-x-4">
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
                <div className="flex-1 p-2 rounded shadow-sm flex flex-col">
                    <div className="flex-1 h-full flex justify-center">
                        <img
                        src={mapPlaceholder}
                        alt="Map"
                        className="w-full max-w-xs h-auto object-cover rounded"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Locations;