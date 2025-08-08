import { useLoaderData } from "react-router-dom"
import { useState } from "react"
import { Link } from "react-router-dom"
import TripHeader from "../components/TripHeader"
import Locations from "../components/Locations"
import Contributors from "../components/Contributors"
import { FaTrash } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"

const tripLoader = async ({ request }) => {
    const tripId = request.url.slice(-24)
    
    const trip = await fetch(`/api/trips/${tripId}`)
    const tripRes = await trip.json();

    return tripRes;
}

const TripPage = ({owner}) => {
    
    const tripData = useLoaderData().trip;
    const trip = tripData.trip;
    const nav = useNavigate();

    const [editLocations, setEditLocations] = useState(false);
    const [locationsData, setLocationsData] = useState(trip.locations);
    const [editContributors, setEditContributors] = useState(false);
    const [contributorsData, setContributorsData] = useState(tripData.contributors);

    const toggleEdit = (edit, saveFn, setEdit) => {
        if (edit) saveFn();
        else setEdit(true);
    }

    const save = async (route, data, field, onSuccess) => {
        try{
            const res = await fetch(`/api/trips/${route}/${trip._id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ [field]: data})
            });
            
            if(!res.ok) throw new Error('Failed to save locations');
            onSuccess();
        } 
        catch(err) {
            console.error("error saving locations:" , err)
        }
    }  

    const deleteTrip = async () => {
        try{
            const res = await fetch(`/api/trips/delete/${trip._id}`, {
                method: 'DELETE'
            })

            if (!res.ok) throw new Error (`Delete failed: ${res.status}`)
        }
        catch(err){
            console.error(err)
        }
        finally{
            nav('/dashboard')
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
                        onToggleEdit={() => 
                            toggleEdit(
                                editLocations, 
                                () => save('editLocations', locationsData, 'locations', () => setEditLocations(false)),
                                setEditLocations
                                )
                            } />
                    <Locations 
                        editMode={editLocations}
                        locations={locationsData}
                        setLocations={setLocationsData}/>
                </section>

                <section className="bg-white border border-sky-200 rounded-lg shadow-md p-6 space-y-4">
                    <TripHeader 
                        headerTitle={"What we saw"}                      
                        modifyText={editLocations ? "Save" : "Add"}
                        onToggleEdit={() => 
                            toggleEdit(
                                editLocations, 
                                () => save('editLocations', locationsData, 'locations', () => setEditLocations(false)),
                                setEditLocations
                                )
                            }
                        />
                    <div>
                        <span>put the photo album here</span>
                    </div>
                </section>

                <section className="bg-white border border-sky-200 rounded-lg shadow-md p-6 space-y-4">
                    <TripHeader 
                        headerTitle={"What we remember"}
                        modifyText={editLocations ? "Save" : "Add"}
                        onToggleEdit={() => 
                            toggleEdit(
                                editLocations, 
                                () => save('editLocations', locationsData, 'locations', () => setEditLocations(false)),
                                setEditLocations
                                )
                            }
                        />
                    <section>
                        <span>put the memory anecdotes here</span>
                    </section>
                </section>


                <section className="bg-white border border-sky-200 rounded-lg shadow-md p-6 space-y-4">
                    <TripHeader 
                        headerTitle={"Who was there"}
                        modifyText={editContributors ? "Save" : "Edit"}
                        onToggleEdit={() => 
                            toggleEdit(
                                editContributors, 
                                () => save('editContributors', contributorsData, 'contributors', () => setEditContributors(false)),
                                setEditContributors
                                )
                            }
                        />
                    <Contributors 
                        editMode={editContributors}
                        contributors={contributorsData}
                        setContributors={setContributorsData}/>
                </section>
            </div>
                {owner 
                    ? <button 
                        onClick={() => deleteTrip()}
                        className="w-full flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 mt-2 rounded-lg transition"
                        >
                            <FaTrash className="text-lg"/>
                            Delete this trip</button> 
                    : null
                }
        </div>
    )
}
export {
    TripPage as default, 
    tripLoader
}