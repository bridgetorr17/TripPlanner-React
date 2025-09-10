import { useState } from "react";
import ContributorsInput from "../components/Contributors/ContributorsInput";
import { useNavigate } from "react-router-dom";
// import { FaPlus } from "react-icons/fa";
import MonthYear from "../components/Trip/MonthYear";
import CreateTripLocationAutocomplete from "../components/Location/CreateTripLocationAutocomplete";

const newTripAttempt = async (tripInfo) => {
    navigate = useNavigate()
    try {
        const res = await fetch('/api/trips/createNew', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tripInfo)
        });

        const result = await res.json();
        return result;
    } catch {
        navigate('/errorpage')
    }
}

const CreateTripPage = () => {

    const [name, setName] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [locations, setLocations] = useState([{}]);
    const [contributors, setContributors] = useState(['']);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();

    const createTrip = async (e) => {
        e.preventDefault();

        locations.shift();
        console.log('SENDING POST REQUEST TO MAKE NEW TRIP')
        console.log(contributors);
        console.log(locations);

        const tripInfo = {
            name,
            subtitle,
            locations,
            contributors,
            month: selectedDate.getMonth(),
            year: selectedDate.getFullYear()
        }

        const nav = '/dashboard'

        try{
            const result = await newTripAttempt(tripInfo);
            console.log(result);

            if (!result.success){
                throw result.message
            }
        }
        catch (err){
            navigate('/errorpage')
            console.log(err);
        }
        finally{
            console.log('navigating to dashboard');
            navigate(nav)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center pt-8 bg-sky-100 min-h-screen px-4">
            <div className="w-full max-w-lg p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-cyan-700">Make a new trip</h1>
                        <span
                            className="text-sm text-cyan-600 hover:text-cyan-800 cursor-pointer"
                            onClick={() => navigate('/dashboard')}>
                                Back to dashboard
                        </span>
                    </div>
            <form onSubmit={createTrip}
                className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 space-y-6">
                <div className="flex flex-col">
                    <label className="mb-1 text-blue-700 font-semibold">Trip Name</label>
                    <div className="flex flex-row justify-between">
                        <input 
                            type="text"
                            name="name" 
                            placeholder="Name your trip"
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                            className="border border-blue-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"/>
                        <MonthYear
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            className="border border-blue-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                    </div>
                    <input 
                        type="text"
                        name="subtitle"
                        placeholder="Add a short description"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)} 
                        className="border border-blue-300 rounded-md px-3 py-2 mt-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"/>
                </div>

                <CreateTripLocationAutocomplete 
                    locations={locations} 
                    setLocations={setLocations} />
                <ContributorsInput 
                    contributorNames={contributors} 
                    setContributorNames={setContributors} />
                <button 
                    type="submit"
                    className="w-full flex justify-center items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition"
                >
                    <FaPlus className="text-lg"/>
                    Create Trip</button>
            </form>
            </div>
        </div>
    )
}

export default CreateTripPage;