const Feedback = require("../../models/admin-models/feedback.model");
const nodemailer = require("nodemailer");
require("dotenv").config();

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.addFeedback = (request, response) => {
  Feedback.create({
    customer: request.body.customer,
    feedBack: request.body.feedBack,
  })
    .then((result) => {
      console.log(result);
      if (result) {
          
        let mailDetails = {
          from: '"CakeLicious 🎂" <process.env.EMAIL>', // sender address
          to: "mohit.ibfoundation@gmail.com", // list of receivers
          subject: "For giving the feedback reply!", // Subject line
          html:
            "<b>Thank You " +
            result.name +
            "! For giving the feedback on our product </b>" +
            "<h3><a href='http://localhost:4200'>CakeLicious</a></h3>" +
            "<b><br><br><br>Regards<br><h5>CakeLicious 🎂</h5></b>",
        };
        mailTransporter.sendMail(mailDetails, function (err, data) {
          if (err) {
            console.log("Error Occurs");
            console.log(err);
          } else {
            console.log("Email sent successfully");
            return response.status(200).json({
                msg:
                  "Thank You " +
                  ", For giving your valuable time and give feedback on our website and product ",
              });
          }
        });
      } else {
        return response.status(500).json(error);
      }
    })
    .catch((err) => {
      return response.status(500).json(err);
    });
};

exports.viewFeedback = (request, response)=>{
    Feedback.find().populate('customer').then((result)=>{
        return response.status(200).json(result);
    }).catch((err)=>{
        return response.status(500).json(err)
    })
}