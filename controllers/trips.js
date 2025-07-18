import Trip from '../models/Trip.js';
import User from '../models/User.js';
import {tripDetails} from '../middleware/tripDetails.js';
import { createPartFromFunctionResponse, GoogleGenAI } from '@google/genai';
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

const getCreateNewTrip = async (req, res) => {
    console.log('creating new trip')
    try{
        res.render('createTrip.ejs')
    }
    catch(err){
        console.error(err);
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
    console.log(req.body.tripName);
    console.log(Array.isArray(req.body.tripStops) ? req.body.tripStops : [req.body.tripStops])
    console.log(req.user._id)
    console.log(contributorIds)

    try{
        await Trip.create({
            tripName: req.body.tripName,
            tripOrigin: req.body.tripOrigin,
            tripStops: Array.isArray(req.body.tripStops) ? req.body.tripStops : [req.body.tripStops],
            createdBy: req.user._id,
            contributors: contributorIds
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
        getCreateNewTrip, 
        postCreateNewTrip, 
        deleteTrip};