const Order = require('../../models/customer-model/order.model')

exports.orderDetail = (request, response) => {
    Order.find().populate('customer').populate('orderedItem.ProductId').exec().
    then(results => {
            return response.status(200).json(results);
        })
        .catch(err => {
            return response.status(500).json(err);
        });
}
exports.singleOrderDetail = (request, response) => {
    Order.findOne({_id:request.body.oId}).populate('customer').populate('orderedItem.ProductId').exec().

    then(results => {
            return response.status(200).json(results);
        })
        .catch(err => {
            return response.status(500).json(err);
        });
}

exports.updateStatus= async (request,response)=>{
    console.log(request.body.status);
    console.log(request.body.oId);
    var order = await Order.findOne({_id:request.body.oId});
    order.orderStatus = request.body.status
    console.log(order);
    order.save().then((result)=>{

           return response.status(200).json(result)
    }).catch((err)=>{ 
        
        return response.status(500).json(err)

    })
}