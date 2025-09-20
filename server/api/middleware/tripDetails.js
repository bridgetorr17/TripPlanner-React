import Trip from '../models/Trip.js';

//gets trip details and formats for controllers
const tripDetails = async (tripId, user) => {
    const trip = await Trip.findById(tripId)
        .populate('owner', 'userName')
        .populate('contributors', 'userName profilePicture')
        .populate({
            path: 'memories.user',
            select: 'userName profilePicture'
        })
        .lean();
    
    if (!trip) {
        throw new Error('Trip not found');
    }

    const contributorNames = trip.contributors.map(c => c.userName)

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
        else if (user._id && contributorNames.includes(user.userName)){
            return {
                userName: user.userName,
                userStatus: 'contributor'
            }
        } 
        //this is a logged in user, but they do not have viewing permissions
        else {
            return null;
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
        trip,
        contributorNames,
        currentUser
    }
}

export { tripDetails }