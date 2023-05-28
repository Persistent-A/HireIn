const asyncHandler = require("express-async-handler");
const Contacts = require("../models/contactUs");

const registerInquiry = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;
  const contact = await Contacts.create({
    name,
    email,
    phone,
    message,
  });
  if (contact) {
    res.status(201).json({ message: "Inquiry stored" });
  } else {
    res.status(400);
    throw new Error("Inquiry not registered, Please try again");
  }
});

const getInqiuries = asyncHandler(async(req, res) => {
  const inquiries = await Contacts.find()
  res.status(200).json(inquiries)
})

module.exports = {
  registerInquiry,
  getInqiuries
};
