import express from 'express';
import * as tripController from '../controllers/trips';
import * as editTripController from '../controllers/editing';
import { ensureAuth } from '../middleware/auth.js';

const router = express.Router();

//tripController
router.get('/:id', ensureAuth, tripController.getTrip);
router.get('/viewer/:id', tripController.getTrip);
router.post('/createNew', tripController.postNewTrip);
router.post('/createNewMemory/:id', tripController.postNewMemory);
router.post('/uploadPhoto/:id', tripController.postNewPhoto);
router.post('/addPlace/:id', tripController.postNewPlace);
router.delete('/delete/:id', tripController.deleteTrip);

//editTripController
router.put('/editTripField/:id', editTripController.editTripField);
router.put('/editContributors/:id', editTripController.editContributors);
router.put('/editMemory/:id', editTripController.editMemory);
router.delete('/deleteMemory/:id', editTripController.deleteMemory);
router.delete('/deletePhoto/:id', editTripController.deletePhoto);
router.delete('/deleteLocation/:id', editTripController.deleteLocation);

export {router};