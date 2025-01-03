import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // Import bcrypt for hashing

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(v);
      },
      message: props => `${props.value} is not a valid password! Password must be at least 8 characters long and include one letter, one number, and one special character.`
    }
  }
});

// Add an instance method to compare passwords
UserSchema.methods.comparePassword = async function (passw) {
  return await bcrypt.compare(passw, this.password);
};

// Add a static method to find users by username
UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username: username });
};

// Add a pre-save hook to hash the password before saving
UserSchema.pre('save', async function (next) {
  const saltRounds = 10; // Number of salt rounds for bcrypt
  if (this.isModified('password') || this.isNew) {
    try {
      const hash = await bcrypt.hash(this.password, saltRounds);
      this.password = hash; // Replace plain text password with hashed password
      next();
    } catch (error) {
      next(error); // Pass error to next middleware
    }
  } else {
    next();
  }
});

export default mongoose.model('User', UserSchema);
