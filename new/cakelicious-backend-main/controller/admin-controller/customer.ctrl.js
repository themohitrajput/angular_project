const path = require("path");
const Customer = require("../../models/customer-model/user.model");
const Order = require("../../models/customer-model/order.model")

const request = require('request')

exports.getCustomer = (request, response) => {
    Customer.find().
    then(results => {
            return response.status(200).json(results);
        })
        .catch(err => {
            return response.status(500).json({ message: 'Sever Error' });
        });
}


