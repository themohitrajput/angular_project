const Support = require("../../models/admin-models/support.model");
const nodemailer = require("nodemailer");
require("dotenv").config();

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.addQuery = (request, response) => {
  Support.create({
    customer: request.body.customer,
    query: request.body.query,
  })
    .then((result) => {
      return response.status(200).json({status:'ok', current_user:result});
    })
    .catch((err) => {
      return response.status(500).json(err);
    });
};

exports.viewQuery = (request, response) => {
  Support.find().populate('customer')
    .then((result) => {
      return response.status(200).json(result);
    })
    .catch((err) => {
      return response.status(500).json(err);
    });
};

exports.giveSupport = (request, response) => {   
  
  // console.log(request.body)
    Support.findOne({email:request.body.email}).then(result=>{
      // console.log(result)
      // console.log("hello")
      if(result){
        let mailDetails = {
          from: '"CakeLicious 🎂" <process.env.EMAIL>', // sender address
          to: request.body.email, // list of receivers
          subject: "For giving the feedback reply!", // Subject line
          html:
            "<b>Thank You " +
            "</b><b><br><br><br>" + request.body.comment   +
            "<h3>CakeLicious</a></h3>" +
            
            "<b><br><br><br>Regards<br><h5>CakeLicious 🎂</h5></b>",
        };
        mailTransporter.sendMail(mailDetails, (err, data)=> {
           if(data) {
            console.log("Email sent successfully");
            return response.status(200).json({
              msg:
                "Thank You ,our team will contact to you and resolve your problem very soon "
            });
          }
          else{
            console.log("Error Occurs");
            console.log(err);

            return response.status(500).json(err)

          }
        });
      }

      }).catch(err=>{
        return response.status(500).json(err)
    })    
};
