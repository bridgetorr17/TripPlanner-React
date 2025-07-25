import Trip from '../models/Trip.js'

const getDashboard = async (req, res) => {
    try{
        let userTrips = await Trip.find({createdBy:req.user.id})
        let sharedTrips = await Trip.find({contributors: { $all: [req.user.id]}})

        console.log(req.user.userName);
        return res.json({
            success: true,
            trips: {
                userTrips,
                sharedTrips
            },
            userName: req.user.userName
        });
    }
    catch(err){
        console.error(err);
    }
}

export { getDashboard }