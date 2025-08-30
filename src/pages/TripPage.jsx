import { useLoaderData, useRevalidator } from "react-router-dom"
import { useState } from "react"
import { Link } from "react-router-dom"
import TripHeader from "../components/TripHeader"
import Locations from "../components/Location/Locations"
import Photos from "../components/Photos/Photos"
import Memories from "../components/Memory/Memories"
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
    
    const trip = useLoaderData().trip;
    const loggedInUser = useLoaderData().loggedInUser;
    const contributorNamesLoader = useLoaderData().contributorNames

    const nav = useNavigate();
    const reavlidator = useRevalidator();

    const [editLocations, setEditLocations] = useState(false);
    const [locationsData, setLocationsData] = useState(trip.locations);
    const [editContributors, setEditContributors] = useState(false);
    const [contributorNames, setContributorNames] = useState(contributorNamesLoader);
    const [editPhotos, setEditPhotos] = useState(false);
    const [editMemories, setEditMemories] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);

    const toggleEdit = (edit, saveFn, setEdit) => {
        if (edit) saveFn();
        else setEdit(true);
    }

    const save = async (route, data, field, onSuccess, setEdit) => {
        try{
            const res = await fetch(`/api/trips/${route}/${trip._id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ [field]: data})
            });

            if(!res.ok) throw new Error('Failed to save');

            const response = await res.json();

            if (!response.success) throw new Error (response.message)

            onSuccess();
        } 
        catch(err) {
            console.error("error saving locations:" , err)
            setEdit(false);
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
            <div className="w-full max-w-3xl mb-2 flex flex-col sm:flex-row items-center justify-between gap-2">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-blue-700 p-1">
                    {trip.name}
                </h1>
                <Link to='/dashboard'>
                    <h2 className="text-lg sm:text-xl text-blue-500 hover:text-blue-600">
                    DASHBOARD
                    </h2>
                </Link>
            </div>
            <div className="w-full max-w-3xl mb-8 flex flex-col items-start overflow-x-hidden">
                <span className="text-2xl font-normal text-blue-600 p-2 whitespace-normal break-words">
                    {trip.subtitle}
                </span>
                <span className="text-xl font-normal text-blue-600 p-2 whitespace-normal break-words">
                    {trip.month} {trip.year}
                </span>
            </div>
            <div className="w-full max-w-3xl space-y-6">
                <section className="bg-white border border-sky-200 rounded-lg shadow-md p-6 space-y-4">
                    <TripHeader 
                        headerTitle={"Where we went"}                        
                        modifyText={editLocations ? "Cancel" : "Edit"}
                        onToggleEdit={() => 
                            toggleEdit(
                                editLocations, 
                                () => {setEditLocations(false)},
                                setEditLocations
                                )
                            } />
                    <Locations 
                        editMode={editLocations}
                        locations={locationsData}
                        setLocations={setLocationsData}
                        tripId={trip._id}/>
                </section>

                <section className="bg-white border border-sky-200 rounded-lg shadow-md p-6 space-y-4">
                    <TripHeader 
                        headerTitle={"What we saw"}                      
                        modifyText={editPhotos ? "Cancel" : "Add"}
                        onToggleEdit={() => 
                            toggleEdit(
                                editPhotos, 
                                () => {setEditPhotos(false)},
                                setEditPhotos
                                )
                            }
                        />
                    <Photos 
                        tripId={trip._id}
                        editMode={editPhotos}
                        setEditMode={setEditPhotos}
                        photosInit={trip.photos}
                        />
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
                        loggedInUser={loggedInUser}/>
                </section>


                <section className="bg-white border border-sky-200 rounded-lg shadow-md p-6 space-y-4">
                    <TripHeader 
                        headerTitle={"Who was there"}
                        modifyText={editContributors ? "Save" : "Edit"}
                        onToggleEdit={() => 
                            toggleEdit(
                                editContributors, 
                                () => save('editContributors', contributorNames, 'contributors', () => {
                                    setEditContributors(false);
                                    reavlidator.revalidate();
                                }, setEditContributors),
                                setEditContributors
                                )
                            }
                        />
                    <Contributors 
                        editMode={editContributors}
                        contributorNames={contributorNames}
                        setContributorNames={setContributorNames}
                        contributors={trip.contributors}/>
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