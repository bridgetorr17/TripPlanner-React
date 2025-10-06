import Trip from '../models/Trip.js'
import User from '../models/User.js'
import { proccessPhoto } from '../middleware/processPhoto.js';

//GET - dashboard. Sorts user owned trips and shared trips. Provides user information
const getDashboard = async (req, res) => {
    try{

        let userTrips = await Trip.find(
            {owner:req.user.id}, 
            {_id: 1, name: 1}
        );

        let sharedTrips = await Trip.find({ 
            contributors: req.user.id,
            owner: { $ne: req.user.id }},
            {_id: 1, name: 1}
        );

        let user = await User.findOne(
            {userName: req.user.userName},
            {profilePicture: 1, userName: 1}
        );

        return res.json({
            success: true,
            trips: {
                userTrips,
                sharedTrips
            },
            userName: user.userName,
            profilePicture: user.profilePicture
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
const getUser = async (req, res) => {

    try{
        let isOwner = false;

        if(req.user.userName === req.params.userName) {
            isOwner = true;
        }

        const userProfile = await User.findOne({userName: req.params.userName})

        res.json({
            success: true,
            isOwner,
            userName: userProfile.userName,
            email: userProfile.email,
            profilePicture: userProfile.profilePicture,
            bio: userProfile.bio
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
const editProfileField = async (req, res) => {
    const field = req.body.field;
    const newValue = req.body.value;
    const userId = req.user._id.toString();

    await User.findByIdAndUpdate(
        userId,
        { $set: { [field]: newValue }},
        { new: true }
    );

    res.json({
        success: true,
        message: 'hello back there'
    })
}

//POST - upload user profile picture 
const postNewProfilePicture = async (req, res) => {
    try{
        const userId = req.user._id.toString();

        const blobUrl = await proccessPhoto(req);

        if (!blobUrl) throw Error;

        await User.findByIdAndUpdate(
            userId,
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