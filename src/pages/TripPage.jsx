import { useLoaderData } from "react-router-dom"
import NavLinks from "../components/NavLinks"
import List from "../components/List"
import { Link } from "react-router-dom"

const tripLoader = async ({ request }) => {
    const tripId = request.url.slice(-24)
    
    const trip = await fetch(`/api/trips/${tripId}`)
    const tripRes = await trip.json();

    return tripRes;
}

const TripPage = ({owner}) => {
    
    const tripData = useLoaderData().trip;
    const trip = tripData.trip;

    return (
        <div className="flex flex-row items-center bg-sky-50 text-blue-800 min-h-screen p-8">
            <div className="w-full max-w-3xl mb-8">
                <h1 className="text-3xl font-bold text-blue-700 mb-4">Trip Page</h1>
                <Link to='/dashboard'>
                    <h2 className="text-2xl text-blue-500 mb-4 hover:text-blue-600">DASHBOARD</h2>
                </Link>
            </div>
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 space-y-6">
                <h2 className="text-2xl font-semibold text-cyan-700">
                    We start in <span className="text-blue-900">{trip.tripOrigin}</span>
                </h2>

                <div>
                    <h3 className="text-xl font-semibold text-teal-700 mb-2">
                        Stops along the way
                    </h3>
                    <List arr={trip.tripStops}/>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-teal-700 mb-2">
                        Contributors
                    </h3>
                    <List arr={tripData.contributors}/>
                </div>

                <div className="text-blue-800">
                    Trip created by <span className="font-semibold">{tripData.creator}</span>
                </div>

                <Link 
                    to={`/trips/edit/${tripData.trip._id}`}
                    state={ {owner} }
                    className="inline-block mt-4 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition"
                >Edit this Trip</Link>
            </div>
        </div>
    )
}
export {
    TripPage as default, 
    tripLoader
}