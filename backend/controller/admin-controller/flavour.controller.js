
const flavourModel = require("../../models/admin-models/flavour.model");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const { request } = require("http");
const { response } = require("express");

const Gstorage = new Storage({
    keyFilename: "cake-licious-firebase-adminsdk-tce6e-3c049fc93d.json"
})
let bucketName = "gs://cake-licious.appspot.com";

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


exports.addToFlavour = (request, response) => {
    let flavourname = request.body.flavourname;
    let flavourimage = "https://firebasestorage.googleapis.com/v0/b/cake-licious.appspot.com/o/" + request.file.filename + "?alt=media&token=hello";

    // uploadFile(path.join("public/images/") + request.file.filename);

    flavourModel.create({ flavourname: flavourname, flavourimage: flavourimage }).then(result => {
        return response.status(201).json(result)
    }).catch(err => {
        console.log(err)
        return response.status(500).json({ err })
    })
}
exports.findTheFlavour = (request, response) => {
    console.log(request.body)
    let flavourname = request.body.flavourname;
    flavourModel.findOne({ flavourname: flavourname }).
        then(result => {
            console.log(request.body)
            return response.status(201).json(result)
        }).catch(err => {
            console.log(request.body)
            return response.status(500).json({ err })
        })
}

exports.findAllData = (request, response) => {
    console.log(request.body)
    flavourModel.find().
        then(result => {
            console.log(request.body)
            return response.status(201).json(result)
        }).catch(err => {
            console.log(request.body)
            return response.status(500).json({ err })
        })
}
exports.deleteTheFlavour = (request, response) => {
    flavourModel.deleteOne({ _id: request.body.fid }).then(result => {
        return response.status(201).json(result)
    }).catch(err => {
        return response.status(500).json({ err: "invalid" });
    })
}
exports.updateTheFlavour = (request, response) => {
    flavourModel.updateOne({ _id: request.body.fid },
        { $set: { flavourname: request.body.name } }).then(result => {
            return response.status(201).json(result);
        }).catch(err => {
            console.log(err)
            return response.status(500).json({ err: "invalid" })
        })
}
