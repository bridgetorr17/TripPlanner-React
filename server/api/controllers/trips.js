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
    let contributors = req.body.contributors;

    if (!Array.isArray(contributors)) {
        contributors = [contributors];
    }

    contributors.unshift(req.user.userName)
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

const postCreateNewMemory = async (req, res) => {
    const tripId = req.params.id;
    const user = await User.findById(req.user._id)
    console.log('gonna make a new memory')
    try{
        const trip = await Trip.findById(tripId);
        trip.memories.push({
            text: req.body.memory,
            user: user._id,
            userName: user.userName,
            location: req.body.location
        });
        await trip.save();
        return res.json({
                text: req.body.memory,
                user: user._id,
                userName: user.userName,
                location: req.body.location
        }); 
    }
    catch(err){
        console.error(err);
        return res.json({
            success: false,
            message: 'error adding the memory to the trip'
        });  
    }
}

export {getTrip, 
        postCreateNewTrip, 
        deleteTrip,
        postCreateNewMemory};