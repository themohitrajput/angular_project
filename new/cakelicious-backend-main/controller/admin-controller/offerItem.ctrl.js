const Offer = require("../../models/admin-models/offerItem.modal");
const path = require("path");
const { request } = require("http");
const { Storage } = require("@google-cloud/storage");

const { response } = require("express");
const Gstorage = new Storage({
    keyFilename: "cake-licious-firebase-adminsdk-tce6e-3c049fc93d.json"
})
let bucketName = "gs://cake-licious.appspot.com"

const uploadFile = async (filename) => {

    await Gstorage.bucket(bucketName).upload(filename, {

        gzip: true,

        metadata: {
            metadata: {
                firebaseStorageDownloadTokens: "hello"
            }
        },
    });
    console.log(`${filename} uploaded to ${bucketName}.`);
}

exports.addOffer = (request, response, next) => {
console.log(request.body);
console.log(request.file)
    uploadFile(path.join("public/images/") + request.file.filename)

    Offer.create({
        name: request.body.name,
        Price:request.body.Price,
        Image: "https://firebasestorage.googleapis.com/v0/b/cake-licious.appspot.com/o/" + request.file.filename + "?alt=media&token=hello"
    })
        .then(result => {
            return response.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            return response.status(403).json({ message: "Oops! Something went wrong.." });
        });
}
exports.viewOffer = (request,response,next)=>{

    Offer.find().then(result=>{
        return response.status(201).json(result);
    })
    .catch(err=>{
        return response.status(403).json({message:"something went wrong"});
    });
}
exports.deleteOffer = (request, response) => {
    console.log(request.body)
    Offer.deleteOne({ _id: request.body.id })
      .then((result) => {
        console.log(result);
        if (result.deletedCount)
          return response.status(200).json({ message: "success" });
        else return response.status(204).json({ message: "not deleted" });
      })
      .catch((err) => {
        console.log(err);
        return response.status(500).json({ message: "Something went wrong" });
      });
  };

  exports.updateOffer = (request,response)=>{
    console.log(request.body);  
      Offer.updateOne({
          _id: request.body.id
      }, {
          $set: {
              Price:request.body.Price    
          }
      }).then(result => {
          if (result.modifiedCount) {
  
              return response.status(200).json(result);
          }
          else
              return response.status(404).json({ message: 'record not found' })
      }).catch(err => {
          console.log(err)
          return response.status(500).json(err);
      });
     }