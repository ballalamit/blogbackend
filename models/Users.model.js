const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    phone_Number: {
        type: Number,
        require: true
    }

})

const UserModel =  mongoose.model('User', userSchema);

module.exports = UserModel