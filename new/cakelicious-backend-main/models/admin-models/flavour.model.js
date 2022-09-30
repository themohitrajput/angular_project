const mongoose = require('mongoose')

const flavourSchema = new mongoose.Schema({
    flavourname: {
        type: String,
    },
    flavourimage: {
        type: String,
        required: true,
    },
    
})

module.exports = mongoose.model('flavour', flavourSchema)