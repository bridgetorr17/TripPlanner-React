import express from 'express';
import * as authController from '../controllers/auth';
import { forwardAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/login', authController.getLogin);
router.get('/logout', authController.getlogout);
router.post('/login', authController.postLogin);
router.post('/resetPasswordEmail', authController.postResetPasswordEmail);
router.post('/signup', authController.postSignup);
router.put('/resetPassword', authController.resetPassword);
router.delete('/delete', authController.deleteAccount);

export {router}