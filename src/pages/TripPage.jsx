import { useLoaderData } from "react-router-dom"
import { useState } from "react"
import List from "../components/List"
import { Link } from "react-router-dom"
import TripHeader from "../components/TripHeader"
import Locations from "../components/Locations"

const tripLoader = async ({ request }) => {
    const tripId = request.url.slice(-24)
    
    const trip = await fetch(`/api/trips/${tripId}`)
    const tripRes = await trip.json();

    return tripRes;
}

const TripPage = ({owner}) => {
    
    const tripData = useLoaderData().trip;
    const trip = tripData.trip;

    const [editLocations, setEditLocations] = useState(false);
    const [locationsData, setLocationsData] = useState(trip.locations);

    const toggleEditLocations = () => {
        if (editLocations) saveLocations();
        else setEditLocations(true);
    }

    const saveLocations = async () => {
        console.log(locationsData);
        try{
            const res = await fetch(`/api/trips/editLocations/${trip._id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ locations: locationsData})
            });
            
            if(!res.ok) throw new Error('Failed to save locations');
            setEditLocations(false);
        } 
        catch(err) {
            console.error("error saving locations:" , err)
        }
    }  

    return (
        <div className="flex flex-col items-center bg-sky-50 text-blue-800 min-h-screen p-8">
            <div className="w-full max-w-3xl mb-2 flex flex-row items-center justify-between">
                <h1 className="text-6xl font-medium text-blue-700 p-3">{trip.name}</h1>
                <Link to='/dashboard'>
                    <h2 className="text-xl text-blue-500 hover:text-blue-600 ">DASHBOARD</h2>
                </Link>
            </div>
            <div className="w-full max-w-3xl mb-8 flex flex-row items-center justify-start">
                <span className="text-2xl font-normal text-blue-600 p-3">Trip Subtitle | Month Year</span>
            </div>
            <div className="w-full max-w-3xl space-y-6">
                <section className="bg-white border border-sky-200 rounded-lg shadow-md p-6 space-y-4">
                    <TripHeader 
                        headerTitle={"Where we went"}                        
                        modifyText={editLocations ? "Save" : "Edit"}
                        onToggleEdit={toggleEditLocations} />
                    <Locations 
                        editMode={editLocations}
                        locations={locationsData}
                        setLocations={setLocationsData}/>
                </section>

                <section className="bg-white border border-sky-200 rounded-lg shadow-md p-6 space-y-4">
                    <TripHeader 
                        headerTitle={"What we saw"}                      
                        modifyText={editLocations ? "Save" : "Add"}
                        onToggleEdit={() => setEditLocations(prev => !prev)}
                        />
                    <div>
                        <span>put the photo album here</span>
                    </div>
                </section>

                <section className="bg-white border border-sky-200 rounded-lg shadow-md p-6 space-y-4">
                    <TripHeader 
                        headerTitle={"What we remember"}
                        modifyText={editLocations ? "Save" : "Add"}
                        onToggleEdit={() => setEditLocations(prev => !prev)}
                        />
                    <section>
                        <span>put the memory anecdotes here</span>
                    </section>
                </section>


                <section className="bg-white border border-sky-200 rounded-lg shadow-md p-6 space-y-4">
                    <TripHeader 
                        headerTitle={"Who was there"}
                        modifyText={editLocations ? "Save" : "Edit"}
                        onToggleEdit={() => setEditLocations(prev => !prev)}
                        />
                    <List 
                        arr={tripData.contributors}
                        links={true}/>
                </section>

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