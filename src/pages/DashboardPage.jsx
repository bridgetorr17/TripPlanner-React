import { useLoaderData } from "react-router-dom"
import TripList from '../components/TripList'

const DashboardPage = () => {
    const { userTrips, sharedTrips } = useLoaderData();

    return (
        <>  
            <h1>DASBOARD</h1>
            <TripList name={'My trips'} owner={true} trips={userTrips}/>
            <TripList name={'Shared trips'} owner={false} trips={sharedTrips}/>
        </>
    )
}

//Dashboard GET
const dashboardLoader = async () => {
    const trips = await fetch(`/api/dashboard`)
    const tripsRes = await trips.json();

    return {
        userTrips: tripsRes.trips.userTrips,
        sharedTrips: tripsRes.trips.sharedTrips
    }
}

export {
    DashboardPage as default,
    dashboardLoader
};