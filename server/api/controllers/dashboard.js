import Trip from '../models/Trip.js'
import User from '../models/User.js'

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

    //TODO: send password, decrypted back through bcrypt (likely need to extract hashing middleware out of User.js)
    res.json({
        userName: req.user.userName,
        email: req.user.email,
        profilePicture: req.user.profilePicture,
        bio: req.user.biography
    })
}

export { 
    getDashboard,
    getUser
}