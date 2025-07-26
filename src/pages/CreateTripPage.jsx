import { useState } from "react";
import DynamicListInput from "../components/DynamicListInput";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

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
        <div className="flex flex-col justify-center items-center pt-8 bg-sky-100 min-h-screen px-4">
            <h1 className="text-2xl font-bold text-cyan-700 text-center">Start a new adventure here</h1>
            <form onSubmit={createTrip}
                className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 space-y-6">
                <div className="flex flex-col">
                    <label className="mb-1 text-blue-700 font-semibold">Trip Name</label>
                    <input 
                        type="text"
                        name="tripName" 
                        placeholder="Name your trip"
                        value={tripName}
                        onChange={(e) => setTripName(e.target.value)} 
                        className="border border-blue-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"/>
                </div>
                <div className="flex flex-col">
                    <label className="mb-1 text-blue-700 font-semibold">Trip Origin</label>
                    <input 
                        type="text"
                        name="tripOrigin" 
                        placeholder="Where do you start?"
                        value={tripOrigin}
                        onChange={(e) => setTripOrigin(e.target.value)} 
                        className="border border-blue-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"/>
                </div>

                <DynamicListInput 
                    label='Stop' 
                    values={tripStops} 
                    setValues={setTripStops} 
                    name='tripStops'
                    color='blue'/>
                <DynamicListInput 
                    label='Contributor' 
                    values={tripContributors} 
                    setValues={setTripContributors} 
                    name='tripContributors'
                    color='teal'/>
                <button 
                    type="submit"
                    className="w-full flex justify-center items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition"
                >
                    <FaPlus className="text-lg"/>
                    Create Trip</button>
            </form>
        </div>
    )
}

export default CreateTripPage;