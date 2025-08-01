import Trip from '../models/Trip.js'
import User from '../models/User.js'
import mongoose from 'mongoose';

const getDashboard = async (req, res) => {
    try{

        let userTrips = await Trip.find({owner:req.user.id})
        let sharedTrips = await Trip.find({contributors: { $all: [req.user.id]}})
        let user = await User.findOne({userName: req.user.userName})

        let profilePicture = user.profilePicture;
        let userName = user.userName;

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

    let isOwner = false;
    if(req.user.userName === req.params.userName) {
        isOwner = true;
    }
    const userProfile = await User.findOne({userName: req.params.userName})

    //TODO: send password, decrypted back through bcrypt (likely need to extract hashing middleware out of User.js)
    res.json({
        isOwner,
        userName: userProfile.userName,
        email: userProfile.email,
        profilePicture: userProfile.profilePicture,
        bio: userProfile.bio
    }
)
}

const editProfileField = async (req, res) => {
    const field = req.params.field;
    const data = req.body;
    const userId = req.user._id.toString();

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