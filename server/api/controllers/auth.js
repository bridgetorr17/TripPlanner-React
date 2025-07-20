import passport from 'passport';
import validator from 'validator';
import User from '../models/User.js';

 const getLogin = (req, res) => {
  console.log('req.isAuth on the get login is ' + req.isAuthenticated())
    if (req.isAuthenticated()) {
      console.log('this user is already logged in, return them to the dashboard');
      return res.redirect('/dashboard')
    }
    res.render('login', { })
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
      console.log('user is ' + user);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: info?.message || 'Incorrect username or password'
        })
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        console.log('login success, direct client to dashboard');
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
  console.log('here in the logout');
    req.logout(() => {
      console.log('User has logged out.')
    })
    req.session.destroy((err) => {
      if (err) console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null
      //res.redirect('/')
    })
  }
  
const getSignup = (req, res) => {
    if (req.user) {
      return res.redirect('/dashboard')
    }
    res.render('signup', {
      title: 'Create Account'
    })
  }
  
const postSignup = async (req, res, next) => {

  console.log(`this is the request! ${req.body.email}`);
    try{
        const validationErrors = []
        if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
        if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
        if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
    
        if (validationErrors.length > 0) {
            console.log('here1')
            req.flash('errors', validationErrors)
            return res.json({
              success: false,
              message: 'Need a valid email and password needs to be 8 characters'
            })
        }
        req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
    
        const existingUser = await User.findOne({$or: [
            {email: req.body.email},
            {userName: req.body.userName}]})
            
        if(existingUser){
            console.log('here2')
            req.flash('errors', { msg: 'Account with that email address or username already exists.' })
            return res.json({
              success: false,
              message: 'Account already exists with that username or password'
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
                console.log('here3');
                console.log(err);
                return next(err)
            }

            console.log('returned successfully')
            return res.json({
              success: true
            });
        })
    }
    catch(err){
        console.log('here4')
        return next(err)
    }
  }

  export { getLogin, postLogin, getlogout, getSignup, postSignup}