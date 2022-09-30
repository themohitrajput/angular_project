const mongoose = require('mongoose');

const occassionSchema = mongoose.Schema({
    occName : {
        type:String,
        required: true
    },
    occImage : {
        type:String,
        required:true,
    },
    occBanner : {
        type:String,
        required:true
    },
    occDescription:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("occassion",occassionSchema);