import Trip from '../models/Trip.js';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config({path: './config/.env'})

//PUT - update location array in a trip
const editLocations = async (req, res) => {
    try{
        const tripId = req.params.id;
        const updatedLocations = req.body.locations;

        await Trip.findByIdAndUpdate(
            tripId,
            {
                $set: {
                    locations: updatedLocations
                }
            },
            {new: true}
        );

        return res.json({
            success: true,
            message: 'Successfully saved edits'
        });
    }
    catch(err){
        console.log(err);
        return res.json({
            success: false,
            message: 'There was an error saving those edits'
        });
    }
}

//PUT - update the contributors array in a trip. 
//TODO: better error handling for users that do not exist. 
const editContributors = async (req, res) => {
    try{
        const tripId = req.params.id;
        const updatedContributors = req.body.contributors;
        
        const updatedUsers = await User.find({ userName: { $in: updatedContributors}})
        const foundName = updatedUsers.map(u => u.userName);

        //handle userNames submitted that are not users
        const missing = updatedContributors.filter(name => !foundName.includes(name));
        if (missing.length > 0){
            console.log(`${missing[0]} does not exist as a user of Triply.`)
            return res.json({
                success: false,
                message: `${missing[0]} does not exist as a user of Triply.`
            })
        }

        const updatedUserIds = updatedUsers.map(user => user._id)
        await Trip.findByIdAndUpdate(
            tripId,
            {
                $set: {
                    contributors: updatedUserIds
                }
            },
            {new: true}
        );

        return res.json({
            success: true,
            message: 'Successfully saved edits'
        });
    }
    catch(err){
        console.log(err);
        return res.json({
            success: false,
            message: 'There was an error saving those edits'
        });
    }
}

//PUT - edit a memory in a trip
const editMemory = async (req, res) => {
    const tripId = req.params.id;

    const trip = await Trip.findById(tripId);
    const memory = trip.memories.id(req.body.id);

    memory.text = req.body.updatedText;

    await trip.save();

    return res.json(memory);
} 

//DELETE - delete a memory in a trip
const deleteMemory = async (req, res) => {
    const tripId = req.params.id;
    const memoryId = req.body.id;

    const trip = await Trip.findById(tripId);

    trip.memories.pull({_id: memoryId})
    await trip.save();

    return res.json(trip.memories)

}

export {editLocations,
        editContributors,
        editMemory,
        deleteMemory
};