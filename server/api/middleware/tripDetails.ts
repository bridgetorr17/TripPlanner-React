import Trip from '../models/Trip.js';
import { IUserMinimal } from '../models/User.js'
import { Types } from 'mongoose';
import { TripType, TripRes } from '../../../shared/types/Trip.js';

interface TripDetailsFailure {
    success: false;
    message: string;
}

//gets trip details and formats for controllers
const tripDetails = async (
    tripId: string | Types.ObjectId, 
    user: IUserMinimal
): Promise <TripDetailsFailure | TripRes> => {
    const trip = await Trip.findById(tripId) 
        .populate('owner', 'userName profilePicture')
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
        .lean<TripType>();
    
    if (!trip) {
        throw new Error('Trip not found');
    }


    const currentUser: {
        userName: string | null;
        userStatus: "owner" | "viewer" | "contributor"
    } | null = (() => {
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
        trip: trip as TripType,
        currentUser
    }
}

export { tripDetails }