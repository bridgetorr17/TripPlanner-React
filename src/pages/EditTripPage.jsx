import { useLocation, useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import NavLinks from "../components/NavLinks";
import DynamicListInput from "../components/DynamicListInput";

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

        console.log(res.message);
        return nav('/dashboard')
    }

    return(
        <>
            <h1>Edit trip</h1>
            <NavLinks />

            {owner ? <button onClick={() => deleteTrip()}>Delete this trip</button> : null}

            <h2>We start in {trip.tripOrigin}</h2>

            <span>We are going to</span>

            <form onSubmit={editTrip}>
                <DynamicListInput label='Stop' values={tripStops} setValues={setTripStops} name='tripStops'/>
                <span>This trip is run by {tripData.creator}</span>
                <br />
                <br />
                <span>Other contributors are</span>
                <DynamicListInput label='Contributor' values={tripContributors} setValues={setTripContributors} name='tripContributors'/>

                <button type="submit">Save Edits</button>
            </form>

        </>
    )
}

export default EditTripPage