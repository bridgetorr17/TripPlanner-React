import { Link } from "react-router-dom";

const TripList = ({name, owner, trips}) => {

    let urlPref = owner ? '/trips/' : '/trips/sharedTrip/'
    
    return (
        <div>
            <h2 className="text-2xl font-semibold text-cyan-700 mb-4">{name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {trips.map((trip) => (
                    <Link to={`${urlPref}${trip._id}`}
                        key={trip._id}
                        className="block p-4 bg-blue-100 text-blue-900 rounded-lg hover:bg-blue-200 transition">
                        {trip.tripName}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default TripList