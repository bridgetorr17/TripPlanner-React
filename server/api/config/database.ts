import mongoose from 'mongoose';

const connectDB = async() => {
    try{

        const mongooseConnect = process.env.DB_STRING;

        if (!mongooseConnect){
            throw new Error ('mongoose connection string must be environment variable')
        }

        await mongoose.connect(mongooseConnect)
    }
    catch(err){
        console.error(err);
        process.exit(1);
    }
}

export { connectDB };