const asyncHandler = require('express-async-handler')


const sendResetPassLink = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
      
      const nursemail = await Nurses.findOne({ email });
      if (!nursemail) {
        return res.json({ status: "Nurse Email Doesn't exist" });
      }
      
      const secret = process.env.JWT_SECRET + nursemail.password;
      
      const payload = { email };
      const token = jwt.sign(payload, secret, {
        expiresIn: "30m"
      });
      
      const link = `http://localhost:5004/nurses/reset-password${nursemail._id}/${token}`;
      
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });
      
      var mailOptions = {
        from: process.env.AUTH_USER,
        to: nursemail.email,
        subject: "Password Reset",
        text:  `${link}`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      console.log(link);
    } catch (error) {
      console.log(error);
    }
  });

  module.exports = {
    sendResetPassLink,
  }