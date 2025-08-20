import express from 'express';
import * as tripController from '../controllers/trips.js';
import * as editTripController from '../controllers/editing.js';
import { ensureAuth } from '../middleware/auth.js';

const router = express.Router();

//tripController
router.post('/createNew', tripController.postCreateNewTrip);
router.delete('/delete/:id', tripController.deleteTrip);
router.get('/:id', ensureAuth, tripController.getTrip);
router.get('/sharedTrip/:id', tripController.getTrip);
router.post('/createNewMemory/:id', tripController.postCreateNewMemory);

//editTripController
router.put('/editLocations/:id', editTripController.editLocations);
router.put('/editContributors/:id', editTripController.editContributors);

export {router};