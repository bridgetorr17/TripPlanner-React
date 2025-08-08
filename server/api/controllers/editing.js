import Trip from '../models/Trip.js';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config({path: './config/.env'})

const editLocations = async (req, res) => {
    try{
        const tripId = req.params.id;
        const updatedLocations = req.body.locations;

        await Trip.findByIdAndUpdate(
            tripId,
            {
                $set: {
                    locations: updatedLocations
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

const editContributors = async (req, res) => {
    try{
        const tripId = req.params.id;
        const updatedContributors = req.body.contributors;
        const updatedContributorsIds = await Promise.all(
            updatedContributors.map(async (cont) => {
                const contUser = await User.findOne({ userName: cont });
                if (contUser === null) return '';
                else return contUser._id;
            })
        );

        console.log(updatedContributorsIds)
        if (updatedContributorsIds.includes('')){
            return res.json({
                success: false,
                message: `${updatedContributors[updatedContributorsIds.indexOf('')]} does not exist as a user of Triply.`
            });
        }

        await Trip.findByIdAndUpdate(
            tripId,
            {
                $set: {
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

export {editLocAndCont,
        editLocations,
        editContributors
};