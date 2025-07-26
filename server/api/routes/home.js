import express from 'express';
import * as authController from '../controllers/auth.js';
import { forwardAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', authController.postLogin);
router.get('/logout', authController.getlogout);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

export {router}