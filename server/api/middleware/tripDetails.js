import Trip from '../models/Trip.js';
import User from '../models/User.js';

//gets trip details and formats for controllers
const tripDetails = async (tripId) => {
    const trip = await Trip.findById(tripId)
        .populate('owner', 'userName')
        .populate('contributors', 'userName profilePicture')
        .lean();
    
    if (!trip) {
        throw new Error('Trip not found');
    }

    const contributorNames = trip.contributors.map(c => c.userName)

    return {
        trip,
        contributorNames
    }
}

export { tripDetails }