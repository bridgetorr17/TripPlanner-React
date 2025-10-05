import Trip, { ITrip, ITripMinimal } from '../models/Trip';
import User, { IUserMinimal } from '../models/User';
import { ILocation } from '../models/Location'
import { tripDetails } from '../middleware/tripDetails';
import { proccessPhoto } from '../middleware/processPhoto.js';
import dotenv from 'dotenv';
import { Request,  Response, NextFunction } from 'express';
dotenv.config({path: './config/.env'})

//GET - trip information for trip page (request comes from react loader)
const getTrip = async (req: Request, res: Response) => {
    try{
        const tripId = req.params.id;
        const details = await tripDetails(tripId, req.user as IUserMinimal);

        if (!details.success){
            return res.json({
                success: false,
                redirect: '/dashboard'
            })
        }

        return res.json({
            success: true,
            trip: details.trip,
            contributors: details.contributors,
            currentUser: details.currentUser
        });
    }
    catch(err){
        console.error(err);
        return res.json({
            success: false,
            message: err
        })
    }
}

//POST - creates new trip. 
const postNewTrip = async (req: Request, res: Response) => {
    let contributors = req.body.contributors as string[];
    const name = req.body.name as string;
    const subtitle = req.body.subtitle as string;
    const locations = req.body.locations as ILocation[];
    const monthNumber = req.body.month as number;
    const year = req.body.year as number;
    const user = req.user as IUserMinimal;

    if (!Array.isArray(contributors)) {
        contributors = [contributors];
    }

    //add this creating user's name as the first contributor
    contributors.unshift(user.userName)

    //array of User documents who's userName appears in the contributors array
    const users = await User.find({ userName: { $in: contributors}})
    //extracting the userNames of those User documents 
    const foundNames = users.map(u => u.userName);

    //handle userNames submitted that are not users
    const missing = contributors.filter(name => !foundNames.includes(name));
    if (missing.length > 0){
        console.warn(`${missing[0]} does not exist as a user of Triply.`)
    }

    const userIds = users.map(u => u._id)
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    try{
        await Trip.create({
            name,
            subtitle,
            owner: user._id,
            contributors: userIds,
            locations,
            month: monthNames[monthNumber],
            year,
        });

        return res.json({
            success: true
        })
    }
    catch(err) {
        console.error(err);
        return res.json({
            success: false,
            message: 'There was an error in the backend'
        })
    }
}

//DELETE - deletes trip 
const deleteTrip = async (req: Request, res: Response) => {
    try{
        await Trip.findOneAndDelete({_id: req.params.id});
        
        return res.json({
            success: true,
            message: 'trip was deleted'
        });
    }
    catch(err){
        console.error(err);
        return res.json({
            success: false,
            message: err
        });
    }
}

//POST - creates new memory in the trip
const postNewMemory = async (req: Request, res: Response) => {
    const tripId = req.params.id;
    const user = req.user as IUserMinimal;
    //const userDoc = await User.findById(user._id)
    console.log(`the user is ${user}`)

    try{
        const trip = await Trip.findById(tripId) as ITrip;
        trip.memories.push({
            text: req.body.memory,
            user: user._id,
            location: req.body.location
        });
        await trip.save();

        const idx = trip.memories.length - 1;
        await trip.populate({
            path: `memories.${idx}.user`,
            select: 'userName profilePicture'
        })
        
        const lastMemory = trip.memories[idx]
        return res.json(lastMemory);
    }
    catch(err){
        console.error(err);
        return res.json({
            success: false,
            message: 'error adding the memory to the trip'
        });  
    }
}

//POST - creates new photo in the trip
const postNewPhoto = async (req: Request, res: Response) => {
    try{
        const user = req.user as IUserMinimal;
        //const user = await User.findById(req.user._id)
        const trip = await Trip.findById(req.params.id) as ITrip;

        const blobUrl = await proccessPhoto(req);

        if (!blobUrl) throw Error;

         trip.photos.push({
            url: blobUrl,
            user: user._id,
            userName: user.userName
        });

        await trip.save();
        
        const lastPhoto = trip.photos[trip.photos.length - 1]
        return res.json(lastPhoto);
    }
    catch(err){
        console.error(err);
        return res.json({
            success: false,
            message: 'error adding the photo to the trip'
        });  
    }
}

const postNewPlace = async (req: Request, res: Response) => {
    const tripId = req.params.id;

    try{
        const trip = await Trip.findById(tripId) as ITrip;
        trip.locations.push(req.body);
        await trip.save();
        
        const lastLocation = trip.locations[trip.locations.length - 1]
        return res.json(lastLocation);
    }
    catch(err){
        console.error(err);
        return res.json({
            success: false,
            message: 'error adding the location to the trip'
        });  
    }
}

export {getTrip, 
        postNewTrip, 
        deleteTrip,
        postNewMemory,
        postNewPhoto,
        postNewPlace};