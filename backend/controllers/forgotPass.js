const asyncHandler = require('express-async-handler')
const Employees = require("../models/employeeModel")
const Employers = require("../models/employerModel")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")

const sendResetPassLink = asyncHandler(async (req, res) => {
    const { email } = req.body;
    console.log(req.body)
    try {
      
      const employee = await Employees.findOne({ email });
      const employer = await Employers.findOne({ email });

      if (!employee && !employer) {
        res.status(400).json({message: "User not found"})
      }
      

      const token = generateToken(employee ? employee._id : employer._id)
     
      const link = `http://localhost:5004/reset-password/${token}`;
      
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });
      
      var mailOptions = {
        from: process.env.AUTH_USER,
        to: email,
        subject: "Password Reset",
        text:  `${link}`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          res.status(200).json({message: "Email sent: " + info.response});
        }
      });
      console.log(link);
    } catch (error) {
      console.log(error);
    }
  });

  const generateToken = async (id) => {
    return await jwt.sign({id}, process.env.JWT_SECRET, {
      expiresIn: "30m"
    });
  }

  module.exports = {
    sendResetPassLink,
  }