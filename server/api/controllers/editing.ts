import Trip, { ITrip } from '../models/Trip.js';
import User, { IUser } from '../models/User.js';
import { IPhoto } from '../models/Photo.js';
import dotenv from 'dotenv';
import { Types } from 'mongoose';
import { Request,  Response } from 'express';
import { IMemory } from '../models/Memory.js';
dotenv.config({path: './config/.env'})

//PUT - update fieds of the trip, such as title, subtitle, and date
const editTripField = async (req: Request, res: Response) => {
    const tripId = req.params.id;
    const field = req.body.field as string;
    const newValue = req.body.value as {month: number; year: number} | string;

    if (typeof newValue === 'object') {
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
const editContributors = async (req: Request, res: Response) => {
    try{
        const tripId = req.params.id;
        const updatedContributors = req.body.contributors as string[];
        
        const updatedUsers = await User.find({ userName: { $in: updatedContributors}}) as IUser[];
        const foundName = updatedUsers.map(u => u.userName) as string[];

        //handle userNames submitted that are not users
        const missing = updatedContributors.filter(name => !foundName.includes(name));
        if (missing.length > 0){
            return res.json({
                success: false,
                message: `${missing[0]} does not exist as a user of Triply.`
            })
        }

        const updatedUserIds = updatedUsers.map(user => user._id) as Types.ObjectId[]
        await Trip.findByIdAndUpdate(
            tripId,
            {$set: { contributors: updatedUserIds}},
            {new: true}
        );

        //should this array be typed? Should I make the contributor type elsewhere so it can be used everywhere?
        const contributors = updatedUsers.map(user => (
            {
                id: user._id,
                userName: user.userName, 
                profilePicture: user.profilePicture
            }
        ));
        return res.json({
            success: true,
            message: 'Successfully saved edits',
            contributors: contributors
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
const editMemory = async (req: Request, res: Response) => {
    try{
        const tripId = req.params.id;
        const trip = await Trip.findById(tripId) as ITrip;
        const memory = trip.memories.find(mem => mem._id.equals(req.body.value.id)) as IMemory;
        
        memory.text = req.body.value.updatedText;

        await trip.save();

        return res.json({
            success: true,
            memory: memory});
    }
    catch(err){
        return res.json({
            success: false,
            message: 'Error updating that memory.'
        })
    }
} 

//DELETE - delete a memory in a trip
const deleteMemory = async (req: Request, res: Response) => {
    try{
        const tripId = req.params.id;
        const memoryId = req.body.id;

        const trip = await Trip.findById(tripId) as ITrip;
        
        trip.memories.pull({_id: memoryId})
        await trip.save();

        await trip.populate({
            path: `memories.user`,
            select: 'userName profilePicture'
        })

        return res.json(trip.memories)
    }
    catch(err){
        return res.json({
            success: false,
            message: 'Error deleting that memory.'
        });
    }
}

//DELETE - delete a photo in a trip
const deletePhoto = async (req: Request, res: Response) => {
    try{
        const tripId = req.params.id;
        const photoId = req.body.id;

        const trip = await Trip.findById(tripId) as ITrip;

        trip.photos.pull({_id: photoId})
        await trip.save();

        return res.json(trip.photos)
    }
    catch(err){
        return res.json({
            success: false,
            message: 'Error deleting that photo.'
        });
    }
}

//DELETE - delete a location in a trip
const deleteLocation = async (req: Request, res: Response) => {
    try{
        const tripId = req.params.id;
        const locationId = req.body.id;

        const trip = await Trip.findById(tripId) as ITrip;

        trip.locations.pull({_id: locationId})
        await trip.save();

        return res.json(trip.locations)
    }
    catch(err){
        return res.json({
            success: false,
            message: 'Error deleting that location.'
        });
    }
}

export {editTripField,
        editContributors,
        editMemory,
        deleteMemory,
        deletePhoto,
        deleteLocation
};