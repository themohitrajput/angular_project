const mongoose = require('mongoose');

const OfferSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    Image:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    }


})
module.exports = mongoose.model("OfferItem",OfferSchema);
