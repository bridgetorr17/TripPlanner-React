import Trip from '../models/Trip';
import { IUserMinimal } from '../models/User'
import { Types } from 'mongoose';
import { IPhoto }  from "../models/Photo"
import { ILocation }  from '../models/Location';
import { IMemory } from '../models/Memory';

interface ITripPopulated {
    _id: Types.ObjectId;
    name: String;
    subtitle: String;
    owner: {_id: Types.ObjectId; userName: string};
    contributors: Array<{ _id: Types.ObjectId; userName: string; profilePicture: string }>;
    locations: ILocation[];
    month: "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December";
    year: number;
    memories: Array< IMemory | { text: string; location: string; user: {_id: Types.ObjectId; userName: string; profilePicture: string;}}>;
    photos: IPhoto[];
}

interface TripDetailsSuccess {
    success: true;
    trip: ITripPopulated;
    currentUser: null | {
        userName: string | null;
        userStatus: string;
    }
}

interface TripDetailsFailure {
    success: false;
    message: string;
}

//gets trip details and formats for controllers
const tripDetails = async (
    tripId: string | Types.ObjectId, 
    user: IUserMinimal
): Promise <TripDetailsFailure | TripDetailsSuccess> => {
    const trip = await Trip.findById(tripId) 
        .populate('owner', 'userName')
        .populate<{ contributors: Array<{ userName: string; profilePicture: string }> }>('contributors', 'userName profilePicture')
        .populate({
            path: 'memories.user',
            select: 'userName profilePicture'
        })
        .lean();
    
    if (!trip) {
        throw new Error('Trip not found');
    }

    const currentUser = (() => {
        //the user is not logged in or does not exist - they are a viewer
        if (!user){
            return {
                userName: null,
                userStatus: 'viewer'
            }
        }
        //the logged in user and owner are the same
        else if (user._id.equals(trip.owner._id)){ 
            return {
                userName: user.userName,
                userStatus: 'owner'
            }
        } 
        //the user is logged in and a contributor, but they are not the owner
        else if (user._id && trip.contributors.some(cont => cont.userName === user.userName)){
            return {
                userName: user.userName,
                userStatus: 'contributor'
            }
        } 
        //this is a logged in user, but they do not have viewing permissions
        else {
            return null
        }
    })();

    if (!currentUser){
        return {
            success: false,
            message: 'This user does not have viewing permissions'
        }
    }

    return {
        success: true,
        trip: trip as unknown as ITripPopulated,
        currentUser
    }
}

export { tripDetails }