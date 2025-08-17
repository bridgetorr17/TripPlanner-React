import Trip from '../models/Trip.js';
import User from '../models/User.js';

const tripDetails = async (tripId) => {
    const trip = await Trip.findById(tripId).lean();
    const creator = await User.findById(trip.owner);
    const creatorName = creator.userName;
    const tripContributors = trip.contributors;

    let contNames = [];
    if(tripContributors[0] !== null) {
        contNames = await Promise.all(
            tripContributors.map(async (cont) => {
                const contUser = await User.findById(cont);
                if (contUser === null) return null;
                else return {
                        userName: contUser.userName, 
                        profilePicture: contUser.profilePicture
                }
            })
        )
    }
    console.log(`contributors names are ${contNames[0].userName}`)

    const existingUsers = contNames.filter(user => user.userName !== null);
    const existingUsersNames = existingUsers.map(user => user.userName);

    console.log(`tripDetails was called. The contributor userNames are ${existingUsersNames}`);
    console.log(`tripDetails was called. The last contributor is ${existingUsers[existingUsers.length-1].userName}`);


    return {
        trip: trip,
        creator: creatorName,
        contributors: existingUsers,
        contributorsNames: existingUsersNames
    }
}

export { tripDetails }