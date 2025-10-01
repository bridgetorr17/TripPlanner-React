import Trip from '../models/Trip.js';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config({path: './config/.env'})

//PUT - update fieds of the trip, such as title, subtitle, and date
const editTripField = async (req, res) => {
    const field = req.body.field;
    const newValue = req.body.value;
    const tripId = req.params.id;

    if (field === 'date') {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        await Trip.findByIdAndUpdate(
            tripId,
            { $set: { 'month': monthNames[newValue.month],
                      'year': newValue.year
                    }
                },
            { new: true }
        );
    } else {
        await Trip.findByIdAndUpdate(
            tripId,
            { $set: { [field]: newValue }},
            { new: true }
        );
    }

    res.json({
        success: true,
        message: 'hello back there'
    })
}

//PUT - update the contributors array in a trip. 
const editContributors = async (req, res) => {
    try{
        const tripId = req.params.id;
        const updatedContributors = req.body.contributors;
        
        const updatedUsers = await User.find({ userName: { $in: updatedContributors}})
        const foundName = updatedUsers.map(u => u.userName);

        //handle userNames submitted that are not users
        const missing = updatedContributors.filter(name => !foundName.includes(name));
        if (missing.length > 0){
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

    await trip.populate({
        path: `memories.user`,
        select: 'userName profilePicture'
    })

    return res.json(trip.memories)

}

//DELETE - delete a photo in a trip
const deletePhoto = async (req, res) => {
    const tripId = req.params.id;
    const photoId = req.body.id;

    const trip = await Trip.findById(tripId);
    
    trip.photos.pull({_id: photoId})
    await trip.save();

    return res.json(trip.photos)

}

//DELETE - delete a location in a trip
const deleteLocation = async (req, res) => {
    const tripId = req.params.id;
    const locationId = req.body.id;

    const trip = await Trip.findById(tripId);

    trip.locations.pull({_id: locationId})
    await trip.save();

    return res.json(trip.locations)

}

export {editTripField,
        editContributors,
        editMemory,
        deleteMemory,
        deletePhoto,
        deleteLocation
};