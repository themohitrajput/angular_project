
const Wishlist = require('../../models/customer-model/wishlist.model')
exports.AddToWishlist = async (request, response) => {

    console.log(request.body);

    var wishlist = await Wishlist.findOne({ customerId: request.body.cusId })

    if (!wishlist) {
        wishlist = new Wishlist({
            customerId: request.body.cusId
        })
    }

    wishlist.wishlistItem.push(request.body.pId)

    wishlist.save().then((result) => {
        return response.status(200).json({status:"ok" , current_user: result})
    }).catch((err) => {
        return response.status(500).json(err)

    })

}

exports.DeleteWishlistItem = (request, response) => {

    Wishlist.updateOne({ customerId: request.body.cusId }, {

        $pullAll: {
            wishlistItem: [request.body.pId]
        }
    }).then((result) => {
        return response.status(200).json(result)
    }).catch((err) => {
        return response.status(500).json(err)
    })
}

exports.ViewWishlist = (request, response) => {

    Wishlist.findOne({ customerId: request.body.cusId }).populate("wishlistItem").then((result) => {
        return response.status(200).json(result)
    }).catch((err) => {
        return response.status(500).json(err)

    })
}


exports.DeleteWishlist = (request, response) => {

    Wishlist.deleteOne({ customerId: request.body.cusId }).then((result) => {
        return response.status(200).json(result)
    }).catch((err) => {
        return response.status(500).json(err);

    })
}
