import { useLoaderData, useRevalidator } from "react-router-dom"
import { useState } from "react"
import { Link } from "react-router-dom"
import TripHeader from "../components/TripHeader"
import Locations from "../components/Locations"
import Memories from "../components/Memories"
import Contributors from "../components/Contributors"
import ConfirmDelete from "../components/ConfirmDelete"
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
    const thisUser = useLoaderData().requestingUser;
    const trip = tripData.trip;
    const contributorsData = tripData.contributors;
    const nav = useNavigate();
    const reavlidator = useRevalidator();

    const [editLocations, setEditLocations] = useState(false);
    const [locationsData, setLocationsData] = useState(trip.locations);
    const [editContributors, setEditContributors] = useState(false);
    const [contributorsName, setContributorsName] = useState(tripData.contributorsNames);
    const [editMemories, setEditMemories] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

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
            
            if(!res.ok) throw new Error('Failed to save');
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
                <h1 className="text-6xl font-medium text-blue-700 p-1">{trip.name}</h1>
                <Link to='/dashboard'>
                    <h2 className="text-xl text-blue-500 hover:text-blue-600 ">DASHBOARD</h2>
                </Link>
            </div>
            <div className="w-3xl mb-8 flex flex-col items-start justify-start">
                <span className="text-2xl font-normal text-blue-600 p-2">{trip.subtitle}</span>
                <span className="text-xl font-normal text-blue-600 p-2">{trip.month} {trip.year}</span>
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
                        modifyText={editMemories ? "Cancel" : "Add"}
                        onToggleEdit={() => 
                            toggleEdit(
                                editMemories, 
                                //using "saveFn" as cancel, actual posting of a new memory is in Memories
                                () => {setEditMemories(false)},
                                setEditMemories
                                )
                            }
                        />
                    <Memories 
                        editMode={editMemories}
                        setEditMode={setEditMemories}
                        memoriesInit={trip.memories}
                        tripId={trip._id}
                        user={thisUser}/>
                </section>


                <section className="bg-white border border-sky-200 rounded-lg shadow-md p-6 space-y-4">
                    <TripHeader 
                        headerTitle={"Who was there"}
                        modifyText={editContributors ? "Save" : "Edit"}
                        onToggleEdit={() => 
                            toggleEdit(
                                editContributors, 
                                () => save('editContributors', contributorsName, 'contributors', () => {
                                    setEditContributors(false);
                                    reavlidator.revalidate();
                                }),
                                setEditContributors
                                )
                            }
                        />
                    <Contributors 
                        editMode={editContributors}
                        contributors={contributorsName}
                        setContributors={setContributorsName}
                        contributorsData={contributorsData}/>
                </section>
                {owner 
                    ?
                    <>
                        <button
                            onClick={() => setModalOpen(true)}
                            className="w-full flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 mt-2 rounded-lg transition"
                        >
                        <FaTrash className="text-lg" />
                        Delete this trip
                        </button>
                        <ConfirmDelete
                            isOpen={modalOpen}
                            onClose={() => setModalOpen(false)}
                            onConfirm={() => {
                                deleteTrip();
                                setModalOpen(false);
                            }}
                            itemName={trip.name}
                        /> 
                    </>
                    : null}
                
            </div>
        </div>
    )
}
export {
    TripPage as default, 
    tripLoader
}