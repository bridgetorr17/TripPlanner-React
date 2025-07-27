import Trip from '../models/Trip.js';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config({path: './config/.env'})

const editLocAndCont = async (req, res) => {
    try{
        const tripId = req.params.id;
        const trip = await Trip.findById(tripId);

        const updatedStops = req.body.tripStops;
        const updatedContributors = req.body.tripContributors;

        const updatedContributorsIds = await Promise.all(
            updatedContributors.map(async (cont) => {
                const contUser = await User.findOne({ userName: cont });
                return contUser._id;
            })
        )

        await Trip.findByIdAndUpdate(
                tripId,
                {
                    $set: {
                        locations: updatedStops,
                        contributors: updatedContributorsIds
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
        console.log(err);
        return res.json({
            success: false,
            message: 'There was an error saving those edits'
        });
    }
}

export {editLocAndCont};