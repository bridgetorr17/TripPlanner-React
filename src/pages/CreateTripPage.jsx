import { useState } from "react";
import ContributorsInput from "../components/Contributors/ContributorsInput";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import MonthYear from "../components/Trip/MonthYear";
import CreateTripLocationAutocomplete from "../components/Location/CreateTripLocationAutocomplete";
import { inputLabelStyles, inputFieldStyles } from "../components/Utilities/commonStyles";

const newTripAttempt = async (tripInfo) => {
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
        throw err;
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

        const tripInfo = {
            name,
            subtitle,
            locations,
            contributors,
            month: selectedDate.getMonth(),
            year: selectedDate.getFullYear()
        }

        try{
            const result = await newTripAttempt(tripInfo);
            
            if (!result.success){
                throw result.message
            }

            navigate('/dashboard')
        }
        catch (err){
            navigate('/errorpage')
            console.log(err);
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
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="flex-1 flex flex-col">
                            <label 
                                className={() => inputLabelStyles("blue")}
                                htmlFor="trip-name">
                                Trip Name
                            </label>
                            <input 
                                required
                                id="trip-name"
                                type="text"
                                name="name" 
                                placeholder="Name your trip"
                                value={name}
                                onChange={(e) => setName(e.target.value)} 
                                className={inputFieldStyles}/>
                        </div>
                        <div className="flex-1 flex flex-col">
                            <label 
                                className={`${() => inputLabelStyles("blue")} block`}
                                htmlFor="trip-date">
                                Date
                            </label>
                            <MonthYear
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                                className={inputFieldStyles}
                            />
                        </div>
                    </div>
                    <div>
                        <input 
                            required
                            type="text"
                            name="subtitle"
                            placeholder="Add a short description"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)} 
                            className={inputFieldStyles}/>
                    </div>
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
                    Create Trip
                </button>
            </form>
            </div>
        </div>
    )
}

export default CreateTripPage;