import express from 'express';
import * as authController from '../controllers/auth.js';
import { forwardAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/resetPasswordEmail', authController.sendResetPasswordEmail);
router.put('/resetPassword', authController.resetPassword)
router.get('/logout', authController.getlogout);
router.post('/signup', authController.postSignup);
router.delete('/delete', authController.deleteAccount);

export {router}