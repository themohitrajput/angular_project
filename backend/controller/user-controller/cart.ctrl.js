const Cart = require("../../models/customer-model/cart.model");
exports.AddToCart = async (request, response) => {
  console.log(request.body);

  var cart = await Cart.findOne({ customerId: request.body.Userid });

  if (!cart) {
    cart = new Cart({
      customerId: request.body.Userid,
    });
  }

  cart.cartItems.push(request.body.id);

  cart
    .save()
    .then((result) => {
      console.log(result);
      return response.status(200).json({ status: "ok", current_user: result });
    })
    .catch((err) => {
      return response.status(500).json(err);
    });
};

exports.DeleteCartItem = (request, response) => {
  Cart.updateOne(
    { customerId: request.body.Userid },
    {
      $pullAll: {
        cartItems: [request.body.pId],
      },
    }
  )
    .then((result) => {
      return response.status(200).json(result);
    })
    .catch((err) => {
      return response.status(500).json(err);
    });
};

exports.ViewCart = (request, response) => {
  console.log(request.body)
  Cart.findOne({ customerId: request.body.Userid })
    .populate("cartItems")
    .then((result) => {  
      console.log(result)
      return response.status(200).json(result);
    })
    .catch((err) => {
      return response.status(500).json(err);
    });
};

exports.DeleteCart = (request, response) => {
  Cart.deleteOne({ customerId: request.body.Userid })
    .then((result) => {
      return response.status(200).json(result);
    })
    .catch((err) => {
      return response.status(500).json(err);
    });
};
