import { useLoaderData, useRevalidator } from "react-router-dom"
import { useState } from "react"
import { Link } from "react-router-dom"
import TripHeader from "../components/Trip/TripHeader"
import FeatureHeader from "../components/Trip/FeatureHeader"
import Locations from "../components/Location/Locations"
import Photos from "../components/Photos/Photos"
import Memories from "../components/Memory/Memories"
import Contributors from "../components/Contributors/Contributors"
import ConfirmDelete from "../components/Utlities/ConfirmDelete"
import { FaTrash, FaShare, FaPlaneDeparture, FaEdit } from "react-icons/fa6"
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

    const [tripData, setTripData] = useState({
        title: trip.name,
        subtitle: trip.subtitle,
        year: trip.year,
        month: trip.month
    })
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
                title: `Hi! Checkout out my ${trip.name} adventure on triply.`,
                url: `https://triplytravel.vercel.app/trips/viewer/${trip._id}`
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
            <TripHeader 
                isOwner={(userStatus === 'owner')}
                tripData={tripData}
                setTripData={setTripData}
                tripId={trip._id}
                />
            <div className="w-full max-w-3xl space-y-6">
                <section className="bg-white border border-sky-200 rounded-lg shadow-md p-6 space-y-4">
                    {(userStatus !== 'viewer') && <FeatureHeader 
                        headerTitle={"Where we went"}                        
                        modifyText={editLocations ? "Cancel" : "Edit"}
                        onToggleEdit={() => 
                            toggleEdit(
                                editLocations, 
                                () => {setEditLocations(false)},
                                setEditLocations
                                )
                            } />}
                    <Locations 
                        editMode={editLocations}
                        locations={locationsData}
                        setLocations={setLocationsData}
                        tripId={trip._id}/>
                </section>

                <section className="bg-white border border-sky-200 rounded-lg shadow-md p-6 space-y-4">
                    {(userStatus !== 'viewer') && <FeatureHeader 
                        headerTitle={"What we saw"}                      
                        modifyText={editPhotos ? "Cancel" : "Add"}
                        onToggleEdit={() => 
                            toggleEdit(
                                editPhotos, 
                                () => {setEditPhotos(false)},
                                setEditPhotos
                                )
                            }
                        />}
                    <Photos 
                        tripId={trip._id}
                        editMode={editPhotos}
                        setEditMode={setEditPhotos}
                        photosInit={trip.photos}
                        loggedInUser={currentUser.userName}
                        />
                </section>

                <section className="bg-white border border-sky-200 rounded-lg shadow-md p-6 space-y-4">
                    {(userStatus !== 'viewer') && <FeatureHeader 
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
                        />}
                    <Memories 
                        editMode={editMemories}
                        setEditMode={setEditMemories}
                        memoriesInit={trip.memories}
                        tripId={trip._id}
                        loggedInUser={currentUser.userName}/>
                </section>


                <section className="bg-white border border-sky-200 rounded-lg shadow-md p-6 space-y-4">
                    {(userStatus !== 'viewer') && <FeatureHeader 
                        headerTitle={"Who was there"}
                        modifyText={editContributors ? "Cancel" : "Edit"}
                        onToggleEdit={() => 
                            toggleEdit(
                                editContributors, 
                                () => {setEditContributors(false)},
                                setEditContributors
                                )
                            }
                        />}
                    <Contributors 
                        editMode={editContributors}
                        setEditMode={setEditContributors}
                        contributorNames={contributorNames}
                        setContributorNames={setContributorNames}
                        contributors={trip.contributors}
                        tripId={trip._id}
                        reavlidator={reavlidator}/>
                </section>
                {(userStatus !== 'viewer') &&
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
                {(userStatus === 'viewer') && 
                    <>
                        <Link to="/signup">
                            <button
                            className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 mt-2 rounded-lg transition"
                            >
                                <FaPlaneDeparture className="text-lg" />
                                Start your new adventure with Triply! Make an account here
                            </button>
                        </Link>
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