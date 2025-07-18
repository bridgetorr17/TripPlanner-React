import { useState } from "react";
import DynamicListInput from "../components/DynamicListInput";
import { useNavigate } from "react-router-dom";

const newTripAttempt = async (newTripInfo) => {

    const res = await fetch('/api/trips/createNew', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTripInfo)
    });

    const result = await res.json();
    return result;
}

const CreateTripPage = () => {

    const [tripName, setTripName] = useState('');
    const [tripOrigin, setTripOrigin] = useState('');
    const [tripStops, setTripStops] = useState(['']);
    const [tripContributors, setTripContributors] = useState(['']);
    const navigate = useNavigate();

    const createTrip = async (e) => {
        e.preventDefault();

        const newTripInfo = {
            tripName,
            tripOrigin,
            tripStops,
            tripContributors
        }

        const result = await newTripAttempt(newTripInfo);

        console.log(result);
        const nav = '/dashboard'
        
        if(!result.success) toast.error(result.message);

        return navigate(nav);
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

                <DynamicListInput label='Stop' values={tripStops} setValues={setTripStops} name='tripStops'/>
                <DynamicListInput label='Contributor' values={tripContributors} setValues={setTripContributors} name='tripContributors'/>
                <button type="submit">Create Trip</button>
            </form>
        </>
    )
}

export default CreateTripPage;