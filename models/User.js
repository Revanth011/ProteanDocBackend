const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "email required"],
        unique: true,
        trim: true,
    },
    username: {
        type: String,
        required: [true, "username required"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "password required"]
    },
    role: {
        type: String,
        default: 'basic',
        enum: ["basic", "admin"]
    },
    accessToken: {
        type: String
    }
});

module.exports = mongoose.model('User', UserSchema);
