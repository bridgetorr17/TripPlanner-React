import { useLoaderData, useRevalidator } from "react-router-dom"
import { useState } from "react"
import { Link } from "react-router-dom"
import TripHeader from "../components/Trip/TripHeader"
import Locations from "../components/Location/Locations"
import Photos from "../components/Photos/Photos"
import Memories from "../components/Memory/Memories"
import Contributors from "../components/Contributors/Contributors"
import ConfirmDelete from "../components/Utlities/ConfirmDelete"
import { FaTrash, FaShare } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import { redirect } from "react-router-dom"

const authTripLoader = async ({ request }) => {
    const tripId = request.url.slice(-24)
    const trip = await fetch(`/api/trips/${tripId}`)
    const tripRes = await trip.json();

    if (!tripRes.success) {
        return redirect(tripRes.redirect)
    }

    return tripRes;
}

const viewerTripLoader = async ({ request }) => {
    const tripId = request.url.slice(-24)
    const trip = await fetch(`/api/trips/viewer/${tripId}`)
    const tripRes = await trip.json();

    if (!tripRes.success) {
        return redirect(tripRes.redirect)
    }

    return tripRes;
}

const TripPage = () => {
    
    const trip = useLoaderData().trip;
    const contributorNamesLoader = useLoaderData().contributorNames
    const currentUser = useLoaderData().currentUser;
    const userStatus = currentUser.userStatus;

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

    const shareTrip = async () => {
        if (!navigator.share){
            alert('sharing not supported on this browser')
            return;
        }

        try{
            await navigator.share({
                title: 'Hey! Checkout out my trip on Triply',
                //url: 'https://triplytravel.vercel.app'
                url: `http://localhost:3000/trips/viewer/${trip._id}`
            });
        }
        catch(err) {
            console.error('sharing failed', err)
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
                        loggedInUser={currentUser.userName}
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
                        loggedInUser={currentUser.userName}/>
                </section>


                <section className="bg-white border border-sky-200 rounded-lg shadow-md p-6 space-y-4">
                    <TripHeader 
                        headerTitle={"Who was there"}
                        modifyText={editContributors ? "Cancel" : "Edit"}
                        onToggleEdit={() => 
                            toggleEdit(
                                editContributors, 
                                () => {setEditContributors(false)},
                                setEditContributors
                                )
                            }
                        />
                    <Contributors 
                        editMode={editContributors}
                        setEditMode={setEditContributors}
                        contributorNames={contributorNames}
                        setContributorNames={setContributorNames}
                        contributors={trip.contributors}
                        tripId={trip._id}
                        reavlidator={reavlidator}/>
                </section>
                {(userStatus === 'owner' || userStatus === 'contributor') &&
                    <>
                        <button
                            onClick={shareTrip}
                            className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 mt-2 rounded-lg transition"
                        >
                            <FaShare className="text-lg" />
                            Share this trip
                        </button>
                    </>
                }
                {(userStatus === 'owner') && 
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
                }
            </div>
        </div>
    )
}
export {
    TripPage as default, 
    authTripLoader,
    viewerTripLoader
}