import express from 'express';
import * as dashboardController from '../controllers/dashboard';
import { ensureAuth } from '../middleware/auth.js';

const router = express.Router();
router.get('/', ensureAuth, dashboardController.getDashboard);
router.get('/:id', ensureAuth, dashboardController.getUser);
router.put('/editUserField', dashboardController.editProfileField);
router.post('/uploadProfilePicture/:userName', dashboardController.postNewProfilePicture);


export {router};