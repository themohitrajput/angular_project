const Razorpay = require('razorpay');
let Order = require('../../models/customer-model/order.model')
let instance = new Razorpay({ key_id: "rzp_test_Wp8VeLBusO80zT", key_secret: "dSqGhFplITE1YB14GewtVqOM" })
exports.createOrderId = (request, response) => {

    instance.orders.create({
        amount: request.body.amount,
        currency: "INR"
    }, (err, order) => {
        if (err) {
            console.log(err)
            return response.status(500).json(err)
        }
        console.log(order)
        console.log("order")
        response.status(200).json(order)
    })
}


exports.placeOrder = (request, response) => {
 
    console.log('body')
    console.log(request.body);
    let {userId,paymentResponse,address,alterMobile,orderedItems} =request.body;
    let payId  = paymentResponse.razorpay_payment_id;
     instance.payments.fetch(payId).then(paymentDetail=>{
    console.log(paymentDetail);
    let transactionId = paymentDetail.acquirer_data
    var secondKey = Object.keys(transactionId)[1]; //fetched the key at second index

    console.log(transactionId[secondKey])
    console.log('out')

    let order = new Order ({
          alterMobile:request.body.alterMobile,
          address:request.body.address,
          paymentMethod:paymentDetail.method,
          paymentId:paymentDetail.id,
          orderId:paymentDetail.order_id,
          customer:userId,
          total:paymentDetail.amount,
          transactionId:transactionId[secondKey]
          

    })
    console.log('out')

     for (let i = 0; i < orderedItems.length; i++) {
        order.orderedItem.push({ ProductId: request.body.orderedItems[i]._id, Qty: request.body.orderedItems[i].qty*1, size:request.body.orderedItems[i].size*1})
    }

    
     order.save().then((result) => {
         console.log('im')
         console.log(result)
        return response.status(200).json({result,msg:'ok'})
    }).catch((err) => {
        return response.status(500).json(err)

    })

     }).catch((err)=>{
         return response.status(500).json({msg:"payment failed",error:err})
     })
   

  


}

exports.buyNow=(request,response)=>{

    console.log(request.body);

   let order = new Order({
        mobile:request.body.mobile,
        address:request.body.address,
        paymentMethod:request.body.paymentMethod,
        paymentId:request.body.paymentId,
        orderId:request.body.orderId,
        customer:request.body.customer,
        total:request.body.total
    })
 
    order.orderedItem.push({ProductId:request.body.pId,Qty:request.body.qty,size:request.body.size})
    order.save().then((result)=>{
     return response.status(200).json(result)
    }).catch((err)=>{
        return response.status(500).json(err)
    })


}


exports.viewOrder=(request,response)=>{
     Order.find({customer:request.body.userId}).populate("orderedItem.ProductId").then(result=>{
        console.log(result)

        return response.status(200).json(result);
     }).catch(err=>{
         console.log(err)
          return response.status(500).json(err)
     })
}


exports.cashOnDelivery=(request,response)=>{
 console.log(request.body)

  let order = new Order ({
        alterMobile:request.body.alterMobile,
        address:request.body.address,
        orderId:request.body.orderId,
        customer:request.body.userId,
        total:request.body.totalAmt
    })

    for (let i = 0; i < request.body.orderedItems.length; i++) {
        order.orderedItem.push({ ProductId: request.body.orderedItems[i]._id, Qty: request.body.orderedItems[i].qty*1, size:request.body.orderedItems[i].size*1})
    }

    order.save().then((result)=>{
        console.log(result)
         return response.status(200).json({result:result,status:'ok'})
    }).catch((err)=>{
        return response.status(500).json(err)

    })
}