import Trip from '../models/Trip.js';
import User from '../models/User.js';
import {tripDetails} from '../middleware/tripDetails.js';
import dotenv from 'dotenv';
dotenv.config({path: './config/.env'})

const getTrip = async (req, res) => {
    try{
        const tripId = req.params.id;
        const details = await tripDetails(tripId);

        return res.json({
            success: true,
            trip: details
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

const postCreateNewTrip = async (req, res) => {
    let contributors = req.body.tripContributors;

    if (!Array.isArray(contributors)) {
        contributors = [contributors];
    }

    const contributorIds = 
        await Promise.all(
            contributors.map(async (cont) => {
                const user = await User.findOne({ userName: cont })
                return user ? user._id : null;
            })
        );

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    try{
        await Trip.create({
            name: req.body.name,
            subtitle: req.body.subtitle,
            owner: req.user._id,
            contributors: contributorIds,
            locations: Array.isArray(req.body.locations) ? req.body.locations : [req.body.locations],
            month: monthNames[req.body.month],
            year: req.body.year
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
const deleteTrip = async (req, res) => {
    console.log('delete trip function reached');
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

export {getTrip, 
        postCreateNewTrip, 
        deleteTrip};