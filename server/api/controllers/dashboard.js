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

export { getDashboard }