import { useLoaderData } from "react-router-dom"

const DashboardPage = () => {
    const { userTrips, sharedTrips } = useLoaderData();

    return (
        <>  
            <h1>DASBOARD</h1>
            {/* <TripList name={'My trips'} trips={userTrips}/>
            <TripList name={'Shared trips'} trips={sharedTrips}/> */}
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