const asyncHandler = require("express-async-handler");
const Employer = require("../models/employerModel");
const Employee = require("../models/employeeModel");
const Engagements = require("../models/engagementsModel");
const Appointments = require("../models/appointmentModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//To Register a Employer
const registerEmployer = asyncHandler(async (req, res) => {
  const { first_name, last_name, phone, email, password } = req.body;

  if (!first_name || !last_name || !phone || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields!");
  }

  const employerExists = await Employer.findOne({ email });
  if (employerExists) {
    res.status(400);
    throw new Error("User already exists!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const employer = await Employer.create({
    first_name,
    last_name,
    age: "",
    gender: "",
    phone,
    email,
    password: hashedPassword,
    address: {
      apt: "",
      street: "",
      city: "",
      postal: "",
      province: "",
    },
  });

  if (!employer) {
    res.status(400);
    throw new Error("Account not created");
  }

  res.status(201).json({
    _id: employer.id,
    first_name: employer.first_name,
    last_name: employer.last_name,
    age: employer.age,
    gender: employer.gender,
    phone: employer.phone,
    email: employer.email,
    address: employer.address,
    token: await generateToken(employer.id),
  });
});

//To login a Employer
const loginEmployer = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const employer = await Employer.findOne({ email });

  if (employer && (await bcrypt.compare(password, employer.password))) {
    res.status(200).json({
      _id: employer.id,
      first_name: employer.first_name,
      last_name: employer.last_name,
      age: employer.age,
      gender: employer.gender,
      phone: employer.phone,
      email: employer.email,
      address: employer.address,
      token: await generateToken(employer.id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const updateEmployer = asyncHandler(async (req, res) => {
  const employer = await Employer.findById(req.user._id);
  if (!employer) {
    res.status(401);
    throw new Error("Not Authorised");
  } else {
    const updatedEmployer = await Employer.findByIdAndUpdate(
      req.user._id,
      req.body,
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({
        ...updatedEmployer._doc,
        token: await generateToken(updatedEmployer._id),
      });
  }
});

const getAppointments = asyncHandler(async (req, res) => {
  const employer = await Employer.findById(req.user._id);
  if (!employer) {
    res.status(400);
    throw new Error("Not Authorized");
  } else {
    const engagements = await Engagements.find({ employer_id: employer._id });
    const appointmentData = await Promise.all(
      engagements.map(async (engagement) => {
        const appointment = await Appointments.findById(
          engagement.appointment_id
        );
        console.log(appointment);
        const employee = await Employee.findById(engagement.employee_id, {
          password: 0,
        });
        console.log(employer);
        return {
          appointment_id: appointment._id,
          appointment_booktime: appointment.appointment_booktime,
          employee: employee,
        };
      })
    );
    res.status(200).json(appointmentData);
    console.log(appointmentData);
  }
});

const generateToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerEmployer,
  loginEmployer,
  updateEmployer,
  getAppointments,
};
