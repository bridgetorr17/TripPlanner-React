import User, { IUser } from '../models/User.js';
import {Strategy as LocalStrategy} from 'passport-local';
import passport from 'passport';
import { CallbackError } from 'mongoose';

passport.use(new LocalStrategy(
    {usernameField: 'email'},
    async (email: string, password: string, done) => {
        try{
            const user = await User.findOne({ email: email.toLowerCase() }) as IUser | null;
            if(!user){
                return done(null, false, { message: `Email ${email} was not found`})
            }
            if(!user.password){
                return done(null, false, { message: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.'})
            }
            user.comparePassword(password, (err: CallbackError | null, isMatch: boolean) => {
                if(err) {return done(err)}
                if(isMatch){
                    return done(null, user)
                }
                return done (null, false, { message: 'Invalid email or password'})
            })
        }
        catch(err){
            if(err) { return done(err)}
        }
    }
))

passport.serializeUser((user: any, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id: string, done) => {
    try{
        const user = await User.findById(id) as IUser | null;
        done(null, user);
    }
    catch(err){
        done(err);
    }
})

export default passport;