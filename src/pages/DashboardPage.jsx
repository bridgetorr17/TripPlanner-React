import { useLoaderData } from "react-router-dom"
import TripList from '../components/TripList'
import NavLinks from "../components/NavLinks";

const DashboardPage = () => {
    const { userTrips, sharedTrips } = useLoaderData();

    return (
        <div className="flex flex-col p-12 bg-sky-50 text-blue-800 min-h-screen">
            <section className="flex flex-row justify-between">
                <h1 className="text-3xl font-bold mb-4 text-blue-700">DASHBOARD</h1>
                <h2 className="text-2xl font-bold mb-4 text-blue-700">USERNAME</h2>
            </section>
            <NavLinks />
            <section className="space-y-12">
                <TripList name={'My trips'} owner={true} trips={userTrips}/>
                <TripList name={'Shared trips'} owner={false} trips={sharedTrips}/>
            </section>
       </div> 
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