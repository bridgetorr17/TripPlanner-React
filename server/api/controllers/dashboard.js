import Trip from '../models/Trip.js'
import User from '../models/User.js'
import formidable from 'formidable'
import { put } from '@vercel/blob';
import { PassThrough } from 'stream';
import fs from 'fs'
import sharp from 'sharp'

//GET - dashboard. Sorts user owned trips and shared trips. Provides user information
const getDashboard = async (req, res) => {
    try{

        let userTrips = await Trip.find(
            {owner:req.user.id}, 
            {_id: 1, name: 1}
        );

        let sharedTrips = await Trip.find({ 
            contributors: req.user.id,
            owner: { $ne: req.user.id }},
            {_id: 1, name: 1}
        );

        let user = await User.findOne({userName: req.user.userName})

        let profilePicture = user.profilePicture;
        let userName = user.userName;

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

//GET - user profile page. 
//TODO: Allow logged in users to edit their password
//      for logged in users view thier profile page, send password, decrypted back through bcrypt (likely need to extract hashing middleware out of User.js)
const getUser = async (req, res) => {

    let isOwner = false;
    if(req.user.userName === req.params.userName) {
        isOwner = true;
    }

    const userProfile = await User.findOne({userName: req.params.userName})

    res.json({
        success: true,
        isOwner,
        userName: userProfile.userName,
        email: userProfile.email,
        profilePicture: userProfile.profilePicture,
        bio: userProfile.bio
    })
}

//PUT - allows users to edit username, email or biography through their profile page
const editProfileField = async (req, res) => {
    const field = req.params.field;
    const data = req.body;
    const userId = req.user._id.toString();

    await User.findByIdAndUpdate(
        userId,
        { $set: { [field]: data['field'] }},
        { new: true }
    );

    res.json({
        success: true,
        message: 'hello back there'
    })
}

//POST - upload user profile picture 
const uploadProfilePicture = async (req, res) => {
    try{
        const userId = req.user._id.toString();
        const {fields, files} = await parseForm(req);

        const readableStream = fs.createReadStream(files.profilePicture[0].filepath)

        const resize = sharp()
            .rotate()
            .resize(800)
            .jpeg({quality: 70})

        const optimizeStream = readableStream
            .pipe(resize);

        const pass = new PassThrough()
        optimizeStream.pipe(pass);

        const blob = await put(files.profilePicture[0].originalFilename, pass, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN,
            addRandomSuffix: true
        })

        await User.findByIdAndUpdate(
            userId,
            { $set: { profilePicture: blob.url }},
            { new: true }
        );

        res.json({
            success: true,
            profilePictureURL: blob.url
        })
    }
    catch(err){
        console.error("upload error: ", err)
        res.json({
            success: false,
            message: 'error uploading photo'
        })
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

export { 
    getDashboard,
    getUser,
    editProfileField,
    uploadProfilePicture
}