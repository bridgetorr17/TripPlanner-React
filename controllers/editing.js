import Trip from '../models/Trip.js';
import User from '../models/User.js';
import {tripDetails} from '../middleware/tripDetails.js';
import { createPartFromFunctionResponse, GoogleGenAI } from '@google/genai';
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
                        tripStops: updatedStops,
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

const getSuggestion = async (req, res) => {

    try{
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

        const tripId = req.params.id;
        const details = await tripDetails(tripId);

        //request to gemini
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Consider these locations on a trip: ${details.trip.tripStops}. Return the full trip, 
            with one added location at the logical positin in the array. Include the reason why 
            this would be a good addition in the 'reason' property. You should only include the 
            reason for your addition, not the already exisiting locations.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: 'object',
                    properties: {
                        tripStops: {
                            type: 'array',
                            items: { type: 'string'}
                        },
                        reason: {type: 'string'},
                        addedStop: {type: 'string'}
                    },
                    required: ['tripStops', 'reason']
                }
            }
        });

        const parsed = JSON.parse(response.text);

        res.render('editTrip.ejs', {trip: details,
                                    ai: {
                                        suggestion: parsed.addedStop,
                                        reason: parsed.reason,
                                        action: 'PUT',
                                        actionName: 'Add suggested location'
                                    },
                                    user: req.user
        })

    }
    catch(err){
        console.error(err);
    }
}


export {editLocAndCont, 
        getSuggestion};