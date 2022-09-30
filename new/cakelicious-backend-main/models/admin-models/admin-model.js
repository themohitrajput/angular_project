const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password : {
        type: String,
        require: true,
        min: 4
    },
    mobile:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        min: 10,
        max: 10
    }
})

module.exports = mongoose.model('admin', adminSchema)