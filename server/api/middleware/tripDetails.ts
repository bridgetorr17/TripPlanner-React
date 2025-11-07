import Trip from '../models/Trip.js';
import { IUserMinimal } from '../models/User.js'
import { Types } from 'mongoose';
import { ILocation }  from '../models/Location.js';

interface ITripPopulated {
    _id: Types.ObjectId;
    name: String;
    subtitle: String;
    owner: {_id: Types.ObjectId; userName: string};
    contributors: IUserMinimal[];
    locations: ILocation[];
    month: "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December";
    year: number;
    memories: Array<{ text: string; location: string; user: {_id: Types.ObjectId; userName: string; profilePicture: string;}}>;
    photos: Array<{ url: string; user: {_id: Types.ObjectId; userName: string;} }>;
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
        .populate
            <{ contributors: IUserMinimal[] }>({
            path: 'contributors',
            select: 'userName profilePicture'
        })
        .populate({
            path: 'memories.user',
            select: 'userName profilePicture'
        })
        .populate({
            path: 'photos.user',
            select: 'userName'
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
        //patchwork solution becuase typescript was throwing error for ITripPopulated being inconsistent with ITrip
        //they are definitely not the same types, ITripPopulated includes additional user information not saved directly in the document, but necessary for the trip loader
        //is there a better work around for this? Or should ITripPopulated not be typed?s
        trip: trip as unknown as ITripPopulated,
        currentUser
    }
}

export { tripDetails }