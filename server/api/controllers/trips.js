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

//GET - trip information for trip page (request comes from react loader)
const getTrip = async (req, res) => {
    try{
        const tripId = req.params.id;
        const details = await tripDetails(tripId, req.user);

        console.log(details.success);

        if (!details.success){
            return res.json({
                success: false,
                redirect: '/dashboard'
            })
        }

        return res.json({
            success: true,
            trip: details.trip,
            contributorNames: details.contributorNames,
            currentUser: details.currentUser
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

//POST - creates new trip. 
const postCreateNewTrip = async (req, res) => {
    let contributors = req.body.contributors;

    if (!Array.isArray(contributors)) {
        contributors = [contributors];
    }
    console.log(req.user);
    contributors.unshift(req.user.userName)

    const users = await User.find({ userName: { $in: contributors}})
    const foundName = users.map(u => u.userName);

    //handle userNames submitted that are not users
    const missing = contributors.filter(name => !foundName.includes(name));
    if (missing.length > 0){
        console.warn(`${missing[0]} does not exist as a user of Triply.`)
    }

    console.log(`locations as is are ${req.body.locations}`)

    const userIds = users.map(u => u._id)
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    try{
        await Trip.create({
            name: req.body.name,
            subtitle: req.body.subtitle,
            owner: req.user._id,
            contributors: userIds,
            locations: req.body.locations,
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

//DELETE - deletes trip 
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

//POST - creates new memory in the trip
const postCreateNewMemory = async (req, res) => {
    const tripId = req.params.id;
    const user = await User.findById(req.user._id)

    console.log(user.profilePicture);

    try{
        const trip = await Trip.findById(tripId);
        trip.memories.push({
            text: req.body.memory,
            user: user._id,
            userName: user.userName,
            userProfilePicture: user.profilePicture,
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

//POST - creates new photo in the trip
const postNewPhoto = async (req, res) => {
    try{
        const user = await User.findById(req.user._id)
        const tripId = req.params.id;
        const trip = await Trip.findById(tripId);

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

        const blob = await put(files.newPhoto[0].originalFilename, pass, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN,
            addRandomSuffix: true
        });

         trip.photos.push({
            url: blob.url,
            user: user._id,
            userName: user.userName
        });

        await trip.save();
        
        const lastPhoto = trip.photos[trip.photos.length - 1]
        return res.json(lastPhoto);
    }
    catch(err){
        console.log(err);
        return res.json({
            success: false,
            message: 'error adding the photo to the trip'
        });  
    }
}

const postNewPlace = async (req, res) => {
    const tripId = req.params.id;

    try{
        const trip = await Trip.findById(tripId);
        trip.locations.push(req.body);
        await trip.save();
        
        const lastLocation = trip.locations[trip.locations.length - 1]
        return res.json(lastLocation);
    }
    catch(err){
        console.error(err);
        return res.json({
            success: false,
            message: 'error adding the location to the trip'
        });  
    }
}

//helper function for processing picture through form
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
        postNewPhoto,
        postNewPlace};