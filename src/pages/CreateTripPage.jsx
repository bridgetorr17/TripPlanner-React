import { useState } from "react";
import DynamicListInput from "../components/DynamicListInput";

const CreateTripPage = () => {

    const [tripName, setTripName] = useState('');
    const [tripOrigin, setTripOrigin] = useState('');
    const [tripStops, setTripStops] = useState(['']);
    const [contributors, setContributors] = useState([''])

    const createTrip = async (e) => {
        e.preventDefault();
    }

    return (
        <>
            <h1>Start a new adventure here</h1>
            <form onSubmit={createTrip}>
                <input 
                    type="text"
                    name="tripName" 
                    placeholder="Name your trip"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)} />
                <input 
                    type="text"
                    name="tripOrigin" 
                    placeholder="Where do you start?"
                    value={tripOrigin}
                    onChange={(e) => setTripOrigin(e.target.value)} />

                <DynamicListInput label='Stop' values={tripStops} setValues={setTripStops}/>
                <DynamicListInput label='Contributor' values={contributors} setValues={setContributors} />
                <button type="submit">Create Trip</button>
            </form>
        </>
    )
}

export default CreateTripPage;