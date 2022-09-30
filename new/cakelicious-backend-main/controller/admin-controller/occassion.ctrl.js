const { response } = require("express");
const Occassion = require("../../models/admin-models/occassion.model")
const {Storage} = require("@google-cloud/storage");
const path = require("path");
const request = require('request')
const Gstorage = new Storage({
    keyFilename : "cake-licious-firebase-adminsdk-tce6e-3c049fc93d.json"
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

  exports.addOccassion = (request, response, next) => {
  
    for(let i=0;i<2;i++){
      console.log(request.files[i].filename)
      uploadFile(path.join("public/images/") + request.files[i].filename);
    }
  Occassion.create({
           
    occDescription: request.body.occDescription,
            occName: request.body.occName,
            occImage:
            "https://firebasestorage.googleapis.com/v0/b/cake-licious.appspot.com/o/" +
            request.files[0].filename +
            "?alt=media&token=hello",
            occBanner:"https://firebasestorage.googleapis.com/v0/b/cake-licious.appspot.com/o/" +
           request.files[1].filename +
           "?alt=media&token=hello",
       })
        .then(result => {
            return response.status(200).json(result);
        })
        .catch(err => {
            return response.status(400).json({ message: "Oops! Something went wrong.." });
        });
}


exports.deleteOccassion = (request, response) => {


Occassion.deleteOne({ _id: request.body.id })
      .then(result => {
        if (result.deletedCount){
        Product.deleteOne({ occassionId: request.body.occassionId })
        .then((result) => {
          return response.status(200).json({ message: "success" });
        }).catch((err) => {          
          return response.status(500).json(err)
        })
      }else
        return response.status(200).json({ message: 'Occassion not deleted' });
          
      })
      .catch(err => {
          console.log(err)
          return response.status(500).json({ message: 'Something went wrong products not deleted' });
      });
}
exports.updateOccassion = (request,response)=>{
  for(let i=0;i<2;i++){
    console.log(request.files[i].filename)
    uploadFile(path.join("public/images/") + request.files[i].filename);
  }
  console.log(request.body);
  console.log(request.files);  
    Occassion.updateOne({
        _id: request.body.occassionId
    }, {
        $set: {
            
            occImage:"https://firebasestorage.googleapis.com/v0/b/cake-licious.appspot.com/o/" +
            request.files[0].filename +
            "?alt=media&token=hello",
            occBanner:"https://firebasestorage.googleapis.com/v0/b/cake-licious.appspot.com/o/" +
            request.files[1].filename +
            "?alt=media&token=hello",
            
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
   
exports.getOccassion = (request, response) => {
    Occassion.find().
    then(results => {
        // console.log(results)
            return response.status(200).json(results);
        })
        .catch(err => {
            return response.status(500).json({ message: 'Sever Error' });
        });
}

exports.getOneOccasssion = (request, response)=>{

  Occassion.findOne({_id:request.params.occassionId}).then((result)=>{
    response.status(200).json(result)
  }).catch((err) => {
    response.status(500).json(err)
  })
}
