//express
import express from 'express';
const app = express();

//mongodb
import { connectDB } from './config/database'

//env variables
import dotenv from 'dotenv';
dotenv.config({path: '../../.env', quiet: true})

//auth
import passport from './config/passport'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import flash from 'express-flash'

//routers
import {router as homeRoutes} from './routes/home.js';
import {router as dashboardRoutes} from './routes/dashboard.js';
import {router as tripRoutes} from './routes/trips.js';

connectDB();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//sessions
const store = MongoStore.create({mongoUrl: process.env.DB_STRING})
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie:{
            maxAge: 24 * 60 * 60 * 1000
        }
    })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//use routers
app.use('/api/', homeRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/trips', tripRoutes);


export default app;