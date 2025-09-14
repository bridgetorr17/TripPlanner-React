import Trip from '../models/Trip.js';

//gets trip details and formats for controllers
const tripDetails = async (tripId, user) => {
    const trip = await Trip.findById(tripId)
        .populate('owner', 'userName')
        .populate('contributors', 'userName profilePicture')
        .lean();
    
    if (!trip) {
        throw new Error('Trip not found');
    }

    const contributorNames = trip.contributors.map(c => c.userName)

    const currentUser = (() => {
        //the logged in user and owner are the same 
        if (user._id.equals(trip.owner._id)){ 
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
        //the user is not logged in, and they have the correct viewer token
        else if (!user._id){
            return {
                userName: null,
                userStatus: 'viewer'
            }
        }
        //this is a logged in user, but they do not have viewing permissions
        else if (user.id){
            return null;
        }
        else {
            return {
                userName: null,
                userStatus: 'viewer'
            }
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