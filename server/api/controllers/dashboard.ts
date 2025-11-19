import Trip from '../models/Trip.js'
import User, { IUserMinimal } from '../models/User.js'
import { Request,  Response } from 'express';
import { proccessPhoto } from '../middleware/processPhoto.js';

//GET - dashboard. Sorts user owned trips and shared trips. Provides user information
const getDashboard = async (req: Request, res: Response) => {
    try{

        const currentUser = req.user as IUserMinimal;

        let userTrips = await Trip.find(
            {owner: currentUser._id}, 
            {_id: 1, name: 1}
        );

        let sharedTrips = await Trip.find({ 
            contributors: currentUser._id,
            owner: { $ne: currentUser._id }},
            {_id: 1, name: 1}
        );

        let user = await User.findOne(
            {userName: currentUser.userName},
            {profilePicture: 1, userName: 1}
        ) as IUserMinimal;

        return res.json({
            success: true,
            trips: {
                userTrips,
                sharedTrips
            },
            user
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

//GET - user profile page
const getUser = async (req: Request, res: Response) => {

    try{
        let isOwner = false;
        const currentUser = req.user as IUserMinimal;
        const requestedUser = await User.findOne({_id: req.params.id }) as IUserMinimal;

        if(currentUser.userName === requestedUser.userName) {
            isOwner = true;
        }

        res.json({
            success: true,
            isOwner,
            requestedUser
        })
    }
    catch(err){
        console.error(err);
        return res.json({
            success: false,
            message: err
        })
    }
}

//PUT - allows users to edit username, email or biography through their profile page
const editProfileField = async (req: Request, res: Response) => {
    try{
        const field = req.body.field;
        const newValue = req.body.value;
        const currentUser = req.user as IUserMinimal;

        const user = await User.findByIdAndUpdate(
            currentUser._id,
            { $set: { [field]: newValue }},
            { new: true }
        ) as IUserMinimal;

        console.log(`updated ${currentUser.userName}'s ${field} field to ${newValue} and here is the proof ${user}`)

        res.json({
            success: true,
            message: 'hello back there'
        })
    } 
    catch(err){
        console.error("upload error: ", err)
        res.json({
            success: false,
            message: 'error updating field'
        })
    }
}

//POST - upload user profile picture 
const postNewProfilePicture = async (req: Request, res: Response) => {
    try{
        const currentUser = req.user as IUserMinimal;

        const blobUrl = await proccessPhoto(req);

        if (!blobUrl) throw Error;

        await User.findByIdAndUpdate(
            currentUser._id,
            { $set: { profilePicture: blobUrl }},
            { new: true }
        );

        res.json({
            success: true,
            profilePictureURL: blobUrl
        })
    }
    catch(err){
        console.error("upload error: ", err)
        res.json({
            success: false,
            message: 'error uploading photo'
        })
    }
}

export { 
    getDashboard,
    getUser,
    editProfileField,
    postNewProfilePicture
}