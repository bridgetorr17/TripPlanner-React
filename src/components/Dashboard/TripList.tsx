import { Link } from "react-router-dom";
import { DashboardTrip } from "pages/DashboardPage";

interface TripListProps {
    trips: DashboardTrip[];
}

const TripList = ({trips}: TripListProps) => {
    
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {trips.map((trip) => (
                    <Link to={`/trips/${trip._id}`}
                        key={trip._id}
                        className="block p-4 bg-blue-100 text-blue-900 rounded-lg hover:bg-blue-200 transition">
                        {trip.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default TripList