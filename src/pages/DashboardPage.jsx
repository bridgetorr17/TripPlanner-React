import { useLoaderData, useLocation } from "react-router-dom"
import { useState } from "react";
import TripList from '../components/TripList'
import NavLinks from "../components/NavLinks";
import { Link } from "react-router-dom";

const DashboardPage = () => {
    const { userTrips, sharedTrips, userName } = useLoaderData();
    const [activeTab, setActiveTab] = useState('my');

    let content = null;

    if (activeTab === 'my'){
        content = <TripList owner={true} trips={userTrips} />
    } else if (activeTab === 'shared'){
        content = <TripList owner={false} trips={sharedTrips} />
    } 

    return (
        <div className="flex flex-col p-12 bg-sky-50 text-blue-800 min-h-screen">
            <section className="flex flex-row justify-between">
                <h1 className="text-3xl font-bold mb-4 text-blue-700">
                    {userName.toUpperCase()}'s DASHBOARD
                </h1>
                <Link to="/logout">
                    <h6 className="text-xl text-blue-400">Logout</h6>
                </Link>
            </section>
            <NavLinks activeTab={activeTab} setActiveTab={setActiveTab}/>
            <section className="space-y-12">
                {content}
            </section>
       </div> 
    )
}

//Dashboard GET
const dashboardLoader = async () => {
    const trips = await fetch(`/api/dashboard`)
    const tripsRes = await trips.json();
    const userName = tripsRes.userName;

    return {
        userTrips: tripsRes.trips.userTrips,
        sharedTrips: tripsRes.trips.sharedTrips,
        userName
    }
}

export {
    DashboardPage as default,
    dashboardLoader
};