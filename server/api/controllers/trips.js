import Trip from '../models/Trip.js';
import User from '../models/User.js';
import {tripDetails} from '../middleware/tripDetails.js';
import formidable from 'formidable'
import { put } from '@vercel/blob';
import { PassThrough } from 'stream';
import fs from 'fs'
import sharp from 'sharp'
import dotenv from 'dotenv';
dotenv.config({path: './config/.env'})

const getTrip = async (req, res) => {
    try{
        const tripId = req.params.id;
        const details = await tripDetails(tripId);

        return res.json({
            success: true,
            trip: details,
            requestingUser: req.user.userName
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

    try{
        const trip = await Trip.findById(tripId);
        trip.memories.push({
            text: req.body.memory,
            user: user._id,
            userName: user.userName,
            location: req.body.location
        });
        await trip.save();
        
        const lastMemory = trip.memories[trip.memories.length - 1]
        return res.json(lastMemory);
    }
    catch(err){
        console.error(err);
        return res.json({
            success: false,
            message: 'error adding the memory to the trip'
        });  
    }
}

const postNewPhoto = async (req, res) => {
    try{
        const userId = req.user._id.toString();
        const {fields, files} = await parseForm(req);

        const readableStream = fs.createReadStream(files.newPhoto[0].filepath)

        const resize = sharp()
            .rotate()
            .resize(800)
            .jpeg({quality: 70})

        const optimizeStream = readableStream
            .pipe(resize);

        const pass = new PassThrough()
        optimizeStream.pipe(pass);

        console.log('we made it here')
        console.log(userId)
    }
    catch(err){
        console.log(err);
    }
}

function parseForm(req){
    return new Promise((resolve, reject) => {
        const form = formidable({multiples: false});
        form.parse(req, (err, fields, files) => {
            if(err) return reject(err);
            resolve ({fields, files})
        })
    });
}

export {getTrip, 
        postCreateNewTrip, 
        deleteTrip,
        postCreateNewMemory,
        postNewPhoto};