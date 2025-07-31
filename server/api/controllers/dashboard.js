import Trip from '../models/Trip.js'
import User from '../models/User.js'
import mongoose from 'mongoose';

const getDashboard = async (req, res) => {
    try{
        console.log(`the user name is: ${req.user.userName}`)

        let userTrips = await Trip.find({owner:req.user.id})
        let sharedTrips = await Trip.find({contributors: { $all: [req.user.id]}})
        let user = await User.findOne({userName: req.user.userName})

        let profilePicture = user.profilePicture;
        let userName = user.userName;

        console.log(`the user is: ${user}`)
        console.log(`the profile picture url is : ${profilePicture}`)
        console.log(`the user name is, this time from mongo : ${userName}`)

        return res.json({
            success: true,
            trips: {
                userTrips,
                sharedTrips
            },
            userName: userName,
            profilePicture: profilePicture
        });
    }
    catch(err){
        console.error(err);
    }
}

const getUser = async (req, res) => {

    //TODO: pass id or username of profile page to be request, and check if it the same user as the requester (needed for accessibilities on the frontend)
    if(req.user.userName === req.user.userName) {
        console.log('yeah this is true')
    }

    //TODO: send password, decrypted back through bcrypt (likely need to extract hashing middleware out of User.js)
    res.json({
        isOwner: true,
        userName: req.user.userName,
        email: req.user.email,
        profilePicture: req.user.profilePicture,
        bio: req.user.bio
    })
}

const editProfileField = async (req, res) => {
    const field = req.params.field;
    const data = req.body;
    const userId = req.user._id.toString();

    console.log('Data:', data);
    console.log('Field:', field);
    console.log('Field Value:', data['field']);
    console.log(userId);

    await User.findByIdAndUpdate(
        userId,
        { $set: { [field]: data['field'] }},
        { new: true }
    );

    res.json({
        success: true,
        message: 'hello back there'
    })
}

export { 
    getDashboard,
    getUser,
    editProfileField
}