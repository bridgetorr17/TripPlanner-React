import { useLoaderData } from "react-router-dom"
import NavLinks from "../components/NavLinks"
import List from "../components/List"
import { Link } from "react-router-dom"

const tripLoader = async ({ request }) => {
    const url = request.url.slice(21)
    
    const trip = await fetch(`/api${url}`)
    const tripRes = await trip.json();

    return tripRes;
}

const TripPage = ({owner}) => {
    
    const tripData = useLoaderData().trip;
    const trip = tripData.trip;

    return (
        <>
            <h1>Trip Page</h1>
            <NavLinks />

            <h2>We start in {trip.tripOrigin}</h2>

            <span>We are going to</span>

            <List arr={trip.tripStops}/>

            <span>This trip is run by {tripData.creator}</span>
            <br />
            <span>Other contributors are</span>
            
            <List arr={tripData.contributors}/>

            <Link 
                to={`/trips/edit/${tripData.trip._id}`}
                state={ {owner} }
            >Edit this Trip</Link>
        </>
    )
}
export {
    TripPage as default, 
    tripLoader
}