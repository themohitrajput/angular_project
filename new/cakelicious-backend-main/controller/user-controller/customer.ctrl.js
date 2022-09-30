const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const auth = require("../../Authorization/userAuth.token");
require("dotenv").config();
const client = require('twilio')('ACcb3d27c9eaeb98faa158ee1c8d35c683', process.env.TWILIO_KEY);

const domain = "https://cake-licious-backend-first.herokuapp.com";

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const Customer = require("../../models/customer-model/user.model");

exports.Signup = async (request, response) => {
  // const { email, name, mobile, password } = request.body;

   console.log(request.body)
   let {user}=request.body
  const hash = await bcrypt.hash(user.password, 12);
  let oldCustomer = await Customer.findOne({ email: user.email, mobile: user.mobile });
  console.log("Old Customer: ", oldCustomer);
  if (!oldCustomer) {
    const result = await Customer.create({
      name: user.name,
      email: user.email,
      password: hash,
      mobile: user.mobile,
      address: "",
      profilePic: "",
      // bio: "",
      otp: "",
      mobileVarify:true

    });
    if (result) {
      console.log(process.env.EMAIL_TOKEN_KEY);
      let verifyToken = jwt.sign(
        {
          emailVerification: {
            _id: result._id,
            email: result.email,
          },
        },
        process.env.EMAIL_TOKEN_KEY,
        {
          expiresIn: "24H",
        }
      );
      let link = domain + "/customer/verify-email/" + verifyToken;
      let mailDetails = {
        from: "'Cakelicious 🎂' <process.env.EMAIL>", // sender address
        to: result.email, // list of receivers
        subject: "Email verification!", // Subject line
        html:
          "<b>Congratulations " +
          result.name +
          "! Your account has been created successfully on</b>" +
          "<h3><a href='http://localhost:4200'>CakeLicious</a></h3>" +
          " <b>This link will be expired within 24 Hours," +
          " Please Click on the <a href=" +
          link +
          ">Link</a> to verify your email to activate your account.</b>" +
          "<b><br><br><br>Regards<br><h5>CakeLicious 🎂</h5></b>",
      };
      mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          console.log("Error Occurs");
          console.log(err);
        } else {
          console.log("Email sent successfully");
        }
      });
      return response.status(200).json(result);
    } else {
      return response.status(500).json(error);
    }
  } else {
    return response.status(404).json({
      error:
        "This email is already assigned with another account, Please try another one!!",
    });
  }
};

exports.resendVerifyEmail = async (request, response) => {
  const email = request.body.email;
  const result = await Customer.findOne({ email: email });
  if (result) {
    let verifyToken = jwt.sign(
      {
        emailVerification: {
          _id: result._id,
          email: result.email,
        },
      },
      process.env.EMAIL_TOKEN_KEY,
      {
        expiresIn: "24H",
      }
    );
    let link = domain + "/customer/verify-email/" + verifyToken;
    let mailDetails = {
      from: '"CakeLicious 🎂" <process.env.EMAIL>', // sender address
      to: result.email, // list of receivers
      subject: "Email verification!", // Subject line
      html:
        "<b>Dear " +
        result.name +
        "! Email verification link has been sent via email, Please check your inbox!</b>" +
        "<h3><a href='http://localhost:4200'>CakeLicious</a></h3>" +
        " <b>This link will be expired within 24 Hours," +
        " Please Click on the <a href=" +
        link +
        ">Link</a> to verify your email to activate your account.</b>" +
        "<b><br><br><br>Regards</b><br><h4>CakeLicious 🎂</h4>",
    };
    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log("Error Occurs in email sending");
        console.log(err);
      } else {
        console.log("Email sent successfully");
      }
    });
    return response.status(200).json({
      msg: "Email verification link has been sent via email, Please check your inbox!",
    });
  } else {
    return response.status(500).json({
      msg: "No account found, please check email address or try another one!",
    });
  }
};

exports.Signin = async (request, response) => {
  const { email, password } = request.body;
  const result = await Customer.findOne({ email: email });
  console.log("Result of login: ", result);
  if (result) {
    console.log(result.status);
    console.log(result.password);
    if (result.status) {
      const match = await bcrypt.compare(password, result.password);
      console.log("hello");
      console.log("Bcrypt: ", match);
      if (match) {
        const token = jwt.sign(
          {
            customer: {
              _id: result._id,
              email: result.email,
              name: result.name,
            },
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: "5D",
          }
        );
        result.token = token;
        console.log("Token: ", token);
        return response.status(200).json({
          status: "login-success",
          current_user: result,
          token: token,
        });
      } else {
        return response.status(500).json({ msg: "Invalid Password." });
      }
    } else {
      return response.status(401).json({ msg: "Not varified" });
    }
  } else {
    return response.status(500).json({ error: "Email is invalid!" });
  }
};

exports.verifyEmail = async (request, response) => {
  console.log("helllo");
  let paramsToken = request.params.id;
  console.log(request.params.id);
  console.log(process.env.EMAIL_TOKEN_KEY);
  console.log(paramsToken);
  let decoded = jwt.verify(paramsToken, process.env.EMAIL_TOKEN_KEY);
  request.verifyToken = decoded;
  const tokenDecoded = request.verifyToken.emailVerification;
  console.log("Verify email ka console with request: " + tokenDecoded._id);
  Customer.updateOne(
    {
      _id: tokenDecoded._id,
    },
    {
      $set: {
        status: true,
      },
    }
  )
    .then((result) => {
      console.log("UpdateOne Result: ");
      console.log(result)
      return response.render('https://cake-licious-first.herokuapp.com/customer/sign-in')
    })
    .catch((err) => {
      console.log("Error in IF OTP: " + err);
      return response.status(500).json({ error: err });
    });
};

exports.resetPassword = async (request, response) => {
  const { email } = request.body;
  const result = await Customer.findOne({ email: email });
  console.log(result);
  if (result) {
    let link = domain + "/customer/verify-otp/" + result._id;
    let otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    let mailDetails = {
      from: '"CakeLicious 🎂" <process.env.EMAIL>', // sender address
      to: result.email, // list of receivers
      subject: "Email verification!", // Subject line
      html:
        "<b>Dear " +
        result.name +
        "!</b>" +
        " Here is the 6 digits OTP: " +
        otp +
        " click on the <a href=" +
        link +
        ">Link</a> and enter OTP to reset your password.</b>" +
        "<b><br><br><br>Regards</b><br><h4>CakeLicious 🎂</h4>",
    };
    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log("Error Occurs in email sending");
        console.log(err);
      } else {
        console.log("Email sent successfully");
      }
    });
    const updateResult = await Customer.updateOne(
      { email: result.email },
      {
        $set: {
          otp: otp,
        },
      }
    );
    return response.status(200).json({ msg: "OTP sent successfully!" });
  } else {
    return response.status(500).json({
      error: "No account found, please check email address of try another one!",
    });
  }
};

exports.sendOtp = async (request, response) => {
  console.log(request.body)

  const { user} = request.body;
  // console.log(request.body)
  
  // console.log(user)
    let otp = otpGenerator.generate(4, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

        // return response.status(200).json({Otp:'1111'})

    function sendTextMessage() {
      client.messages
        .create({ body: 'Hello' + request.body.name  + "enter this otp to verify your account : " + otp, from: '+18592518128', to: "+91"+request.body.mobile})
        .then(message => {
          console.log(message.sid)
          console.log(message)
     
                  return response.status(200).json({msg:'ok',Otp:otp})
                
        }
        )
        .catch((err) => {
          console.log("error")
          console.log(err);
          return response.status(500).json({msg:'err',err:err})

        }); 
    }
    sendTextMessage();
   
  
};

exports.verifyOTP = async (request, response) => {
  let id = request.body.id;
  let otp = request.body.otp;
  let result = await Customer.findOne({ _id: id });

  if (result) {
    console.log(result);
    console.log(otp);
    if (result.otp == otp) {
      console.log("hello");
      let resultUpdate = await Customer.updateOne(
        { _id: id },
        { $set: { otp: "", updatedAt: Date.now() ,
                  mobileVarify:true} }
      );
      console.log(resultUpdate);
      if (resultUpdate.matchedCount) {
        return response
          .status(200)
          .json({ msg: "Your mobile has been updated successfully." });
      } else {
        return response.status(500).json({ msg: "error" });
      }
    } else {
      return response
        .status(500)
        .json({ msg: "Invalid OTP, Please try again." });
    }
  } else {
    return response.status(500).json({ msg: "Invalid Email." });
  }
};

exports.Profile = async (request, response) => {
  // get the id from JWT token later
  const { address, mobile, name ,email   } = request.body;
  
  console.log(request.body);
  try {
    const result = await Customer.updateOne(
      { email:email},
      {
        $set: {
          name: name,
          address: address,
          // profilePic:"https://firebasestorage.googleapis.com/v0/b/cake-licious.appspot.com/o/" + req.file.filename + "?alt=media&token=hello",
          mobile: mobile,
          updatedAt: Date.now(),
        },
      }
    );
    console.log(result)
    if (result.modifiedCount) {
      const fullData = await Customer.findOne({ email: email })
      return response.status(200).json({
        status:"login-success",
        current_user : fullData
      });
    } else{
      return response.status(500).json({
        error: "Something went wrong, Profile not updated.",
        result: result,
      });
    }
  } catch (err) {
    return response.status(500).json({
      msg: "Something went wrong! Please check your details",
      error: err,
    });
  }
};

exports.loginWithGoogle = (request, response, next) => {
  const { email } = request.body;
  Customer.findOne({
    email: email,
  })
    // lksdflksdfkdsklf
    .then((result) => {
      console.log(result);
      if (result) {
        const token = jwt.sign(
          {
            customer: {
              _id: result._id,
              email: result.email,
              name: result.name,
            },
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: "5D",
          }
        );
        result.token = token;
        console.log("Token: ", token);
        return response.status(200).json({
          status: "login-success",
          current_user: result,
          token: token,
        });
      } else {
        response.status(400).json({ msg: "Email Doesn't match" });
      }
    })
    .catch((err) => {
      console.log(err);
      return response
        .status(500)
        .json({ message: "Oops Something Went Wrong" });
    });
};
