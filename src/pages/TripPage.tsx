import { useLoaderData } from "react-router-dom"
import React, { useState } from "react"
import { useEffect } from "react"
import { Link, LoaderFunctionArgs } from "react-router-dom"
import TripHeader from "../components/Trip/TripHeader"
import FeaturePanel from "../components/Trip/FeaturePanel"
import Locations from "../components/Location/Locations"
import Photos from "../components/Photos/Photos"
import Memories from "../components/Memory/Memories"
import Contributors from "../components/Contributors/Contributors"
import ConfirmDelete from "../components/StyledComponents/ConfirmDelete"
import StyledButton from "../components/StyledComponents/StyledButton"
import Modal from "../components/StyledComponents/Modal"
import { FaTrash, FaShare, FaPlaneDeparture } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import { redirect } from "react-router-dom"
import { ITripPopulated } from '../../server/api/middleware/tripDetails'
import { LocationType } from '../../shared/types/Location'

interface TripRes {
    success: boolean,
    trip: ITripPopulated,
    currentUser: {
        userName: string | null,
        userStatus: 'owner' | 'viewer' | 'contributor'
    } | null
}

export type ToggleEditArgs = {
    edit: boolean;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const authTripLoader = async ({params}: LoaderFunctionArgs) => {
    const {id} = params;
    const trip = await fetch(`/api/trips/${id}`)
    const tripRes = await trip.json();

    if (!tripRes.success) {
        return redirect(tripRes.redirect)
    }
    return tripRes as TripRes;
}

const viewerTripLoader = async ({params}: LoaderFunctionArgs) => {
    const {id} = params;
    const trip = await fetch(`/api/trips/viewer/${id}`)
    const tripRes = await trip.json();

    if (!tripRes.success) {
        return redirect(tripRes.redirect)
    }

    return tripRes as TripRes;
}

const TripPage = () => {
    const trip = useLoaderData().trip;
    const currentUser = useLoaderData().currentUser;
    const userStatus = currentUser.userStatus as 'owner' | 'viewer' | 'contributor';

    const nav = useNavigate();

    const tripData ={
        title: trip.name,
        subtitle: trip.subtitle,
        year: trip.year,
        month: trip.month
    };

    const [editLocations, setEditLocations] = useState<boolean>(false);
    const [locationsData, setLocationsData] = useState<LocationType[]>(trip.locations);
    const [editContributors, setEditContributors] = useState<boolean>(false);
    const [editPhotos, setEditPhotos] = useState<boolean>(false);
    const [editMemories, setEditMemories] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [viewerModalOpen, setViewerModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (userStatus === 'viewer'){
            setViewerModalOpen(true);
        }
    }, [userStatus])

    const toggleEdit = ( { edit, setEdit }: ToggleEditArgs) => {
        if (edit) setEdit(false);
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

    const navToSignup = () => {
        nav('/signup')
    }

    return (
        <div className="flex flex-col items-center bg-sky-50 text-blue-800 min-h-screen p-8">
            <TripHeader 
                isOwner={(userStatus === 'owner')}
                tripData={tripData}
                tripId={trip._id}
            />
            <div className="w-full max-w-3xl space-y-6">
                <FeaturePanel 
                    userStatus={userStatus}
                    toggleEdit={toggleEdit}
                    editFeature={editLocations}
                    setEditFeature={setEditLocations}
                    headerTitle="Where we went"
                >
                    <Locations 
                        editMode={editLocations}
                        locations={locationsData}
                        setLocations={setLocationsData}
                        tripId={trip._id}/>
                </FeaturePanel>

                <FeaturePanel
                    userStatus={userStatus}
                    toggleEdit={toggleEdit}
                    editFeature={editPhotos}
                    setEditFeature={setEditPhotos}
                    headerTitle="What we saw"
                >
                    <Photos 
                        tripId={trip._id}
                        editMode={editPhotos}
                        setEditMode={setEditPhotos}
                        photosInit={trip.photos}
                        loggedInUser={currentUser.userName}
                        />
                </FeaturePanel>

                <FeaturePanel
                    userStatus={userStatus}
                    toggleEdit={toggleEdit}
                    editFeature={editMemories}
                    setEditFeature={setEditMemories}
                    headerTitle="What we remember"
                >
                    <Memories 
                        editMode={editMemories}
                        setEditMode={setEditMemories}
                        memoriesInit={trip.memories}
                        tripId={trip._id}
                        loggedInUser={currentUser.userName}/>
                </FeaturePanel>
                <FeaturePanel
                    userStatus={userStatus}
                    toggleEdit={toggleEdit}
                    editFeature={editContributors}
                    setEditFeature={setEditContributors}
                    headerTitle="Who was there"
                >
                    <Contributors 
                        editMode={editContributors}
                        setEditMode={setEditContributors}
                        contributorsInit={trip.contributors}
                        tripId={trip._id}/>
                </FeaturePanel>
                {(userStatus !== 'viewer') &&
                    <>
                        <StyledButton
                            onClickFn={shareTrip}
                            color={"blue"}
                        >
                            <FaShare className="text-lg" />
                            Share this trip
                        </StyledButton>
                    </>
                }
                {(userStatus === 'owner') && 
                    <>
                        <StyledButton
                            onClickFn={() => setModalOpen(true)}
                            color={"red"}
                        >
                            <FaTrash className="text-lg" />
                            Delete this trip
                        </StyledButton>
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
                            <StyledButton
                                onClickFn={navToSignup}
                                color="blue"
                            >
                                <FaPlaneDeparture className="text-lg" />
                                Start your new adventure with Triply! Make an account here
                            </StyledButton>
                        </Link>
                    </> 
                }
                {(userStatus === 'viewer') &&
                    <Modal
                        isOpen={viewerModalOpen} 
                        onClose={() => { 
                            setViewerModalOpen(false); 
                        }} 
                        title={`Welcome!`}
                    >
                        <p>
                            This is Triply, a travel recording app you can use with friends and family. 
                            <br />
                            <br />
                            You are seeing this trip as a viewer- only a preview! After signing up, you will be able to make trips of your own, as well as contribute to others' trips. 
                        </p>
                    </Modal>
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