import { useLocation, useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import NavLinks from "../components/NavLinks";
import DynamicListInput from "../components/DynamicListInput";
import { FaSave, FaTrash } from "react-icons/fa";

const EditTripPage = () => {
    const loc = useLocation()
    const owner = loc.state?.owner;

    const tripData = useLoaderData().trip;
    const trip = tripData.trip;

    const [tripStops, setTripStops] = useState(trip.tripStops);
    const [tripContributors, setTripContributors] = useState(tripData.contributors);

    const nav = useNavigate();

    const deleteTrip = async () => {
        try{
            const res = await fetch(`/api/trips/delete/${trip._id}`, {
                method: 'DELETE'
            })

            if (!res.ok) throw new Error (`Delete failed: ${res.status}`)

            console.log('trip deleted');
        }
        catch(err){
            console.error(err)
        }
        finally{
            nav('/dashboard')
        }
    }

    const editTrip = async (e) => {
        
        e.preventDefault();

        const tripEdits = {
            tripStops,
            tripContributors
        }

        const res = await fetch(`/api/trips/edit/${trip._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tripEdits)
        });

        return nav('/dashboard')
    }

    return(
         <div className="flex flex-col justify-center items-center pt-8 bg-sky-100 min-h-screen px-4">
            <h1 className="text-2xl font-bold text-cyan-700 text-center pb-6">Edit Trip</h1>

            <form onSubmit={editTrip}
                className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 space-y-6">

                <h2 className="text-2xl font-semibold text-cyan-700">
                    Starting in <span className="text-blue-900">{trip.tripOrigin}</span>
                </h2>

                <DynamicListInput 
                    label='Stop' 
                    values={tripStops} 
                    setValues={setTripStops} 
                    name='tripStops'
                    color='blue'
                />

                <div className="text-blue-800">
                    Trip created by <span className="font-semibold">{tripData.creator}</span>
                </div>

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
                    <FaSave className="text-lg"/>
                    Save Edits</button>

                {owner 
                    ? <button 
                        onClick={() => deleteTrip()}
                        className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                        >
                            <FaTrash className="text-lg"/>
                            Delete this trip</button> 
                    : null
                }
            </form>
       </div>
    )
}

export default EditTripPage