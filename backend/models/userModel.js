const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return enteredPassword == this.password;
};


module.exports = mongoose.model('user', userSchema)