const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Transgender', 'Other'],
        required: true
      },
    email: { type: String, required: true, unique: true },
    dateofBirth: String,
    password: {type: String, required: true},
    confirmPassword: {type: String, required: true}
});

const user = mongoose.model('User', userSchema)
module.exports = { user };