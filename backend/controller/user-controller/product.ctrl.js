const express = require('express');
const router = express.Router()

const Product = require("../../models/admin-models/product.model");


exports.addReview = async (request, response) => {
  console.log(request.body);

  var product = await Product.findOne({ _id: request.body.pId });
  console.log(product.rating)
  console.log(request.body.rating)
  // var rating = product.rating + request.body.rating
  product.prodReview.push({
    userId: request.body.userId,
    review: request.body.review,
    rating: request.body.rating
  });

  product.save()
    .then((result) => {
      console.log(result)
      return response.status(200).json(result);
    })
    .catch((err) => {
      console.log(err)

      return response.status(500).json(err);
    });
};

exports.editReview = async (request, response) => {

  let product = await Product.findOne({ _id: request.body.pId });
  var i;
  for (i = 0; i < product.prodReview.length; i++) {
    if (request.body.rId == product.prodReview[i]._id) {

      console.log(product.prodReview[i]._id);
      console.log(request.body.rId);

      product.prodReview[i]._id = request.body.rId;
      product.prodReview[i].userId = request.body.userId;
      product.prodReview[i].rating = request.body.rating;
      product.prodReview[i].review = request.body.review;
      break;
    }

  }

  // console.log(product.prodReview[i])
 console.log(product.prodReview)
  product.save().then((result)=>{
          console.log(result);
     return response.status(200).json(result)
  }).catch((err)=>{
    return response.status(500).json(err)

  })






}


exports.searchProduct = (request, response) => {
  let regex = new RegExp(request.params.text, "i");
  Product.find()
    .or([
      {
        prodName: regex,
      },
      {
        prodDescription: regex,
      },
    ])
    .then((result) => {
      return response.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).json({ message: "Error.." });
    });
};

exports.getProductByCategory = (request, response) => {
  Product.find({ categoryId: request.params.categoryId })
    .then((result) => {
      return response.status(200).json(result);
    })
    .catch((err) => {
      return response.status(500).json({ message: "internal server error" });
    });
};

exports.getProductById = async (request, response) => {

//   let product = await Product.findOne({_id:request.params.pId});
//   console.log(product)
//   console.log(request.params.pId)
//   product.prodReview = [];
//   console.log(product)

//   product.save().then(r=>{
//     response.json(r)
//   }).catch((err)=>{
// console.log(err)
//   })

// console.log(product.prodReview)
//   product.prodReview = [];
//   console.log(product.prodReview)

  Product.find({ _id: request.params.pId })
    .then((result) => {
      console.log(result);
      return response.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).json({ message: "internal server error" });
    });
};