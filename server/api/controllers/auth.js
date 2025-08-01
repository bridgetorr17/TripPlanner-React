import passport from 'passport';
import validator from 'validator';
import User from '../models/User.js';

const getLogin = (req, res) => {
    if (req.isAuthenticated()) {
      console.log(`this user is already logged in!`)
      res.json({
        success: true
      })
    } else res.json({success: false})
  }

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
  
const getlogout = (req, res) => {
  console.log('about to logout the user');
  //req.clearCookie('connect.sid');
  req.session.destroy((err2) => {
    if (err2) {
      console.log('Error destroying session: ', err2)
      return res.json({success: false})
    }
    req.user = null;
    console.log('session destroyed')
    return res.json({success: true})
  })
}
  
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
            console.log(validationErrors)
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

  const deleteAccount = async (req, res) => {
    console.log('in the backend gonna try to delete this account');

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
            deleteAccount
  }