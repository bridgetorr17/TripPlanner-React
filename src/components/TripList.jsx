import { Link } from "react-router-dom";

const TripList = ({name, owner, trips}) => {

    let urlPref = owner ? '/trips/' : '/trips/sharedTrip/'
    return (
        <>
            <h2>{name}</h2>
            {trips.map((trip) => (
                <li key={trip._id}>
                    <Link to={`${urlPref}${trip._id}`}>
                        {trip.tripName}
                    </Link>
                </li>
            ))}
        </>
    )
}

export default TripList