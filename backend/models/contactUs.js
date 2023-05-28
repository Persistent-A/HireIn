const mongoose = require("mongoose");

const contactUsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your first name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
    },
    phone: {
      type: String,
      required: [true, "Please enter your first phone number"],
    },
    message: {
      type: String,
      required: [true, "Please enter message"],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Contact", contactUsSchema);
