import passport from 'passport';
import validator from 'validator';
import User from '../models/User.js';
import ResetToken from '../models/ResetToken.js';
import { sendEmail } from '../middleware/sendEmail.js';
import crypto from 'crypto';

//GET - login page. Redirects user to dashboard if session cookie exists
const getLogin = (req, res) => {
    if (req.isAuthenticated()) {
      res.json({
        success: true
      })
    } else res.json({success: false})
  }

//POST - login request. Validates user account and redirects to dashboard
const postLogin = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.status(401).json({
          success: false,
          message: info?.message || 'Incorrect username or password'
        })
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Incorrect username or password'
        })
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        const {id, email} = user;
        return res.json({
          success: true,
          user: {
            id,
            email 
          }
        })
      })
    })(req, res, next)
  }
  
//GET - logout. Ends the user's session. User will have to re-login.
const getlogout = (req, res) => {
  req.session.destroy((err2) => {
    if (err2) {
      console.log('Error destroying session: ', err2)
      return res.json({success: false})
    }
    req.user = null;
    return res.json({success: true})
  })
}
  
//POST - signup. Creates new user with valid username, password and email.
const postSignup = async (req, res, next) => {
    try{
      req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
    
      const existingUser = await User.findOne({$or: [
          {email: req.body.email},
          {userName: req.body.userName}]})
          
      if(existingUser){
          return res.json({
            success: false,
            message: [{ msg: 'Account already exists with that username or email'}]
          })
      }

        const validationErrors = []
        if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
        if (!validator.isStrongPassword(req.body.password, {
          minLength: 8,
          minLowercase: 0,
          minUppercase: 0,
          minNumbers: 1,
          minSymbols: 1
        })) {validationErrors.push({ msg: 'Password be at least 8 characters and must contain at least 1 number and 1 special character.'})}
        if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match.' })
    
        if (validationErrors.length > 0) {
            return res.json({
              success: false,
              message: validationErrors
            })
        }

        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        });

        await user.save();

        req.logIn(user, (err) => {
            if(err){
                console.log(err);
                return next(err)
            }
            return res.json({
              success: true
            });
        })
    }
    catch(err){
        return next(err)
    }
  }

  const sendResetPasswordEmail = async (req, res) => {

    try{
      console.log('Received reset request for:', req.body.email);

      const { email } = req.body;
      if (!email) { 
        return res.status(400).json({ success: false, message: 'Email is required' });
      }

      const user = await User.findOne({ email: req.body.email })

      if (!user) {
        console.log('No user found with email:', email);
        // Respond success anyway (security) but email won't be sent
        return res.json({ success: true, message: 'If that email is registered, a reset link will be sent.' });
      }

      await ResetToken.deleteMany({ userId: user._id });

      const token = crypto.randomBytes(32).toString('hex');
      await ResetToken.create({ 
        userId : user._id,
        token
      });

      const resetUrl = `https://triplytravel.vercel.app/resetPassword?token=${token}&id=${user._id}`

      try{
        const emailResult = await sendEmail( 
          'bridgetorr1902@gmail.com',
          'Triply Password Reset',
          user.email,
          user.userName,
          'Reset your Triply Password',
          `You requested a password reset. Please click the link below to set a new password:\n\n` +
          `${resetUrl}\n\n` +
          `If you didn’t request this, you can safely ignore this email.`,
          `<strong>Reset your password</strong><br/><br/>` +
          `You requested a password reset for your Triply account.<br/>` +
          `Click the button below to reset your password:<br/><br/>` +
          `<a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background-color:#1D4ED8;color:white;text-decoration:none;border-radius:4px;">Reset Password</a><br/><br/>` +
          `If the button doesn’t work, copy and paste the following link into your browser:<br/>` +
          `<a href="${resetUrl}">${resetUrl}</a><br/><br/>` +
          `If you did not request a password reset, no action is needed.<br/><br/>` +
          `Thanks,<br/>The Triply Team`,
        );

        console.log('Mailjet send result: ', emailResult)
      }
      catch(err) {
        console.error('Error sending email with sendEmail(): ', err)
        return res.status(500).json({ success: false, message: 'Failed to send reset email' });
      }

      return res.json({ success: true, message: 'Reset email sent (if that email is registered).' });
    }
    catch(err) {
      console.error('sendResetPasswordEmail caught error:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  const resetPassword = async (req, res) => {
    //validate email with userId and active token
    //if expried token => send that message
    //validate password - is strong password, and password confirmation matches
    //hash the password, and save into User profile
    //send success message to frontend

    try{
      const { token, userId, email, password, confirmPassword } = req.body;

      const resetToken = await ResetToken.findOne({ userId: userId, token: token});
      if (!resetToken){
        return res.status(400).json({ success: false, message: 'Invalid or expired reset token.' });
      }

      const validationErrors = [];
      if (!validator.isStrongPassword(password, {
          minLength: 8,
          minLowercase: 0,
          minUppercase: 0,
          minNumbers: 1,
          minSymbols: 1
        })) {validationErrors.push({ msg: 'Password be at least 8 characters and must contain at least 1 number and 1 special character.'})}
        if (password !== confirmPassword) validationErrors.push({ msg: 'Passwords do not match.' })
    
        if (validationErrors.length > 0) {
            return res.json({
              success: false,
              message: validationErrors
            })
        }

        const user = await User.findById(userId);
        if (user.email === email) {
          user.password = password;
          await user.save();
        } else return res.status(400).json({ success: false, message: 'Invalid email' });

        return res.status(200).json({ success: true, message: 'Password reset successful. You can now login with your new password.' })
    }
    catch(err){
      console.error(err);

    }
  }

//DELETE - account. Deletes user's account. 
//TODO: remove user as contributor from all trips before deleting.
  const deleteAccount = async (req, res) => {
    const userId = req.user._id;

    try{
      const result = await User.findByIdAndDelete(userId);
      if(result) return getlogout(req,res);
      else res.json({ success: false });
    }
    catch(err) {
      console.error('Error deleting user account:', err);
      res.json({ success: false });
    }
  }

  export {  getLogin, 
            postLogin, 
            getlogout, 
            postSignup,
            sendResetPasswordEmail,
            resetPassword,
            deleteAccount
  }