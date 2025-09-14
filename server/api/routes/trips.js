import express from 'express';
import * as tripController from '../controllers/trips.js';
import * as editTripController from '../controllers/editing.js';
import { ensureAuth } from '../middleware/auth.js';

const router = express.Router();

//tripController
router.post('/createNew', tripController.postCreateNewTrip);
router.delete('/delete/:id', tripController.deleteTrip);
router.get('/:id', ensureAuth, tripController.getTrip);
router.get('/sharedTrip/:id', ensureAuth, tripController.getTrip);
router.post('/createNewMemory/:id', tripController.postCreateNewMemory);
router.post('/uploadPhoto/:id', tripController.postNewPhoto)
router.post('/addPlace/:id', tripController.postNewPlace)

//editTripController
router.put('/editLocations/:id', editTripController.editLocations);
router.put('/editContributors/:id', editTripController.editContributors);
router.put('/editMemory/:id', editTripController.editMemory);
router.delete('/deleteMemory/:id', editTripController.deleteMemory);
router.delete('/deletePhoto/:id', editTripController.deletePhoto);
router.delete('/deleteLocation/:id', editTripController.deleteLocation);

export {router};