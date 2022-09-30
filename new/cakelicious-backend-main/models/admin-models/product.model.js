const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    OccassionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'occassion'
    },

    flavourId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'flavour'
    },
    prodName: {
        type: String,
        required: true
    },
    prodImage1: {
        type: String,
        required: true
    },
    prodImage2: {
        type: String,
        required: true
    },
    prodImage3: {
        type: String,
        required: true
    },
    prodImage4: {
        type: String,
        required: true
    },
    prodPrice: {
        type: Number,
        required: true
    },
    prodDescription: {
        type: String
    },
    
    prodReview: [
        {
            userId: {
                type: String,
                reference : 'customer'
            },
             review: {
                type: String
            },
            rating:{
                type:Number
            }
        }],
    discount: {
        type: String
    },
    rating:{
        type:Number,
        default:0
    }
    
})

module.exports = mongoose.model('product', productSchema)