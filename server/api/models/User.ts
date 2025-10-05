import bcrypt from 'bcrypt';
import mongoose, { Document, Model, Types } from 'mongoose';

//Minimal user interface - provides only user details for read-only logic
export interface IUserMinimal {
  _id: Types.ObjectId;
  userName: string;
  email: string;
  profilePicture?: string;
  bio?: string;
}

//Full mongoose User document interface 
export interface IUser extends IUserMinimal, Document<Types.ObjectId>{
  password: string
}

const UserSchema = new mongoose.Schema<IUser>({
    userName: {
      type: String, 
      unique: true,
      required: true
    },
    email: { 
      type: String, 
      unique: true,
      required: true
    },
    password: { 
      type: String,
      required: true
    },
    profilePicture: {
      type: String,
      default: 'https://i.pinimg.com/736x/9f/16/72/9f1672710cba6bcb0dfd93201c6d4c00.jpg',
    },
    bio: {
      type: String,
      default: ''
    }
});

// Password hash middleware.
 UserSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next() }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err) }
      user.password = hash
      console.log('after the hash, the password is', user.password);
      next()
    })
  })
})


// Helper method for validating user's password.
UserSchema.methods.comparePassword = function comparePassword(candidatePassword: string, cb: Function) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}

const User = mongoose.model<IUser>('User', UserSchema);

export default User;