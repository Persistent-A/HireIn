const asyncHandler = require("express-async-handler");
const Employees = require("../models/employeeModel");
const Employers = require("../models/employerModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

const sendResetPassLink = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  try {
    const employee = await Employees.findOne({ email });
    const employer = await Employers.findOne({ email });

    if (!employee && !employer) {
      res.status(400).json({ message: "User not found" });
    }

    const token = await generateToken(employee ? employee._id : employer._id);
    console.log(token);

    const link = `https://hire-in.vercel.app/reset-password/${token}`;

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
      text: `${link}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.status(200).json({ message: "Email sent: " + info.response });
      }
    });
    console.log(link);
  } catch (error) {
    console.log(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  console.log(decoded);
  let user;
  user = await Employers.findByIdAndUpdate(
    decoded.id,
    { password: hashedPassword },
    {
      new: true,
    }
  ).select(-decoded.password);

  if (!user) {
    user = await Employees.findByIdAndUpdate(
      decoded.id,
      { password: hashedPassword },
      {
        new: true,
      }
    ).select(-decoded.password);
  }
  console.log(user);
  res.status(201).json({ message: "Password changed successfully" });
});

const generateToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });
};

module.exports = {
  sendResetPassLink,
  resetPassword,
};
