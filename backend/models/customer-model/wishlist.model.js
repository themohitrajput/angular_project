const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    },
    wishlistItem: [{
            type:String,
            ref: 'product'
    }]
})

module.exports = mongoose.model('wishlist', wishlistSchema)