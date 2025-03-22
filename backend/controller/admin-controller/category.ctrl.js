const { response } = require("express");
const Category = require("../../models/admin-models/category.model");
const Product = require("../../models/admin-models/product.model")
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const request = require('request')
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

exports.addCategory = (request, response, next) => {

    uploadFile(path.join("public/images/") + request.file.filename)

    Category.create({
        catName: request.body.catName,
        catImage: "https://firebasestorage.googleapis.com/v0/b/cake-licious.appspot.com/o/" + request.file.filename + "?alt=media&token=hello"
    })
        .then(result => {
            return response.status(201).json(result);
        })
        .catch(err => {
            return response.status(403).json({ message: "Oops! Something went wrong.." });
        });
}

exports.deleteCategory = (request, response) => {


    Category.deleteMany({ _id: request.body.id })
        .then(result => {
            Product.deleteMany({ categoryId: request.body.id }).then((result) => {
                if (result.deletedCount)
                    return response.status(200).json({ message: 'success' });
                else
                    return response.status(200).json({ message: 'product not deleted' });
            }).catch((err) => {
                return response.status(500).json({ message: 'Something went wrong products not deleted' });
            })

        })
        .catch(err => {
            console.log(err)
            return response.status(500).json({ message: 'Something went wrong products not deleted' });
        });
}
exports.getCategory = (request, response) => {
    Category.find().
        then(results => {
            // console.log(results)
            return response.status(200).json(results);
        })
        .catch(err => {
            return response.status(500).json({ message: 'Sever Error' });
        });
}
exports.updateCategory = (req, response, next) => {
    console.log(req.body)
    console.log(req.file)
    let newImage;
    if (req.file) {

        newImage = "https://firebasestorage.googleapis.com/v0/b/cake-licious.appspot.com/o/" + req.file.filename + "?alt=media&token=hello";
        uploadFile(path.join("public/images/") + req.file.filename)

        request({
            uri: req.body.oldImage,
            qs: {
                key: "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDAqCWw4wqPoaCs\nFydsHyo3QdDAUeUq1yGhAX/1jZPGtAhFCjXWZ9K2i2wpZ6Gp6ccQvw2N21I6rvvy\nsvrzptE+KaFYRSj98UxxB6JsHibWKPDLevFbu8+sjbUYrQtfy+sWxE6Pe/4/SjVz\ng6DdMnUhBSIToMEmFLbyfSi3rNvyFaL8sUFhFhQiw25zMZHgnd0AkPTvqhdThMxr\n84PYFMobmj9S9nCaMTneSYfAAE7zDxCIvQMwUtogEc98W1nof7HyQ3t7NcAftxgT\nEYFxW+xwkpaHWcdiX6UaAg0L5pJo/+dQApB86eZgwUnP6af1HO3sdo3XMFcRlCe6\nGMXYcrZ7AgMBAAECggEAX0cJFNjD0VKynkj5IxyqiRdQgLw/pJcuN20BdlPlIGDK\nsjIhe/5uk/6RqExrBBfsbdi+gEhV+1WsnlNrjnISizaVZ40Uf7oE/uUyq1uiA0nO\nBCOyF5bjVsfiJuj1dhPoGKNO4uEEVRKDKrSPKrWYfZMHTkOzIf0emP/S0jt3rtmt\nr6yoXz0WllZpPCDMlwyHo7X7/547N6/BUfJfPB16pGaDixJrfmQu89D6Bjju6IE9\nkFxNWobEIfRHqW3le7bdlXMWDwTcRpRlbo9O9MzTsghu++P5o5X6VI0ahLwqTtIt\nSXPqqQWvvvn4e1XjffJVZpfm4X1bBz1Pe2MYA8rJGQKBgQD1sTDZNFH8pdMV+FVE\ntdG5a5vXv6Q5sgDaRG7IMfUfdxf1lmB6uJbse6RaWx7HlAGfurF0BAv29TKJemrz\nWz4WNtapShnbAzT2lrWiwtT3wCaNWgJ53u+9ruS1o8wYtmTh8vfi/VBG7Q99ERVs\n3t6UnAgCieXIdy1wnMyRm2VtJwKBgQDIvVc5OAKH+9hMQ7ZsFVQFL7N0pLzuitjG\nvQZUviM3BkitKrs8t4ul00+M5NZ+VPcCGhXonBBt9op+UZNlVKD5HT5Nbp+f7KlW\n0TD+D9TGvo81PZazRiGvbeY9lmpGLO88BjwpSPiQt0TV687wrQlEkrrZK7BdhE5p\n5Ia2nuyojQKBgQCu1noJh1b0sFiHYOHk9HIbPf13ybOnLwm2SU6AfjSOQKS3Klzb\n1/HmtZHejstXgPaq4SMYiSyugAyHkqr7JKoJCts1OzstBJozBEqbWYRODdoharUq\nXsBCPmwY6kf6KgmeVNWcHWF8J4SHHpodkHfaTzLQA6uWPWEDq0FUOL4zrwKBgG5u\n64tI6uuQe0AJiFQRr7VitqEW9/FrZTKATvlT2N+uj1Dkzzjp6OODSqJCSlYZvAHm\nA+OB5+/2z94KVsJKOnyRv/KtRxeeBNMEJqW+Y9oqf3JUvZFGpcVy+lUraK/OjJZC\n/9nekRBcInxlS+VP7GdTKYPL6yynWtQaqpnQ+HUJAoGBALyZMEWlCVpBB0Ue1I0c\nIowCGvBL0M0dSXV/FfwYJ1dmHuIB7Ux3GvF+LlVIUmynZqwCswIrATQoZpAZT5W/\n/Tv34iOegGjzhYZCzjKPuoK9BkEm32bl9qP125mAqsVTr7eoreSnz0qYyNMIImyC\nfJWHJiHKagLBuMNsBSww97ut"
            },
            method: 'DELETE'
        })
    } else {
        newImage = req.body.oldImage;
    }
    Category.updateOne({
        _id: req.body.categoryid
    }, {
        $set: {
            catName: req.body.catName,
            catImage: newImage
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

