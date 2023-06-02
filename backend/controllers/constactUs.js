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

const getInqiuries = asyncHandler(async (req, res) => {
  const inquiries = await Contacts.find({ isResolved: false });
  res.status(200).json(inquiries);
});

const markResolveAppointment = asyncHandler(async (req, res) => {
  const inquiry = await Contacts.findByIdAndUpdate(
    req.params.appointment_id,
    { isResolved: true },
    {
      new: true,
    }
  );
  if (inquiry) {
    res.status(200).json({ message: "Inquiry resolved" });
  } else {
    res.status(400).json({ message: "Error resolving appointment" });
  }
});

module.exports = {
  registerInquiry,
  getInqiuries,
  markResolveAppointment,
};
