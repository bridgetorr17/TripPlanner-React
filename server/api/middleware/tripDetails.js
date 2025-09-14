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

    let currentUser = {
        userName: null,
        userStatus: 'viewer'
    }

    console.log(`user id is ${user._id} and trip owner id is ${trip.owner._id}`)

    //the logged in user and owner are the same 
    if (user._id.equals(trip.owner._id)){ 
        currentUser.userName = user.userName;
        currentUser.userStatus = 'owner';
        console.log('this is the owner');
    } 
    //the user is logged in and a contributor, but they are not the owner
    else if (user._id){
        currentUser.userName = user.userName;
        currentUser.userStatus = 'contributor';
        console.log('this is a contributor');
    } 
    //the user is not logged in
    else {
        currentUser.userStatus = 'viewer';
        console.log('this is a viewer')
    }

    const contributorNames = trip.contributors.map(c => c.userName)

    return {
        trip,
        contributorNames,
        currentUser
    }
}

export { tripDetails }