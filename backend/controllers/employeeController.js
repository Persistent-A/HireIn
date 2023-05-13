const asyncHandler = require("express-async-handler");
const Employee = require("../models/employeeModel");
const Employer = require("../models/employerModel");
const Engagements = require("../models/engagementsModel");
const Appointments = require("../models/appointmentModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getEmployees = asyncHandler(async (req, res) => {
  const { specialization } = req.params;
  if (specialization.length === 0) {
    return res.status(200).json([]);
  }

  const preferredEmployees = await Employee.find(
    { specialization: { $in: [new RegExp(specialization, "i")] } },
    {
      password: 0,
      address: 0,
      phone: 0,
      email: 0,
    }
  );
  console.log(preferredEmployees);
  res.status(200).json(preferredEmployees);
});

//To Register an Employee
const registerEmployee = asyncHandler(async (req, res) => {
  const { first_name, last_name, phone, email, password } = req.body;

  if (!first_name || !last_name || !phone || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields!");
  }

  const employeeExists = await Employee.findOne({ email });
  if (employeeExists) {
    res.status(400);
    throw new Error("User already exists!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const employee = await Employee.create({
    first_name,
    last_name,
    age: "",
    gender: "",
    phone,
    email,
    specialization: "",
    password: hashedPassword,
    address: {
      apt: "",
      street: "",
      city: "",
      postal: "",
      province: "",
    },
  });

  if (!employee) {
    res.status(400);
    throw new Error("Account not registered");
  }

  res.status(201).json({
    _id: employee.id,
    first_name: employee.first_name,
    last_name: employee.last_name,
    phone: employee.phone,
    email: employee.email,
    address: employee.address,
    age: employee.age,
    gender: employee.age,
    specialization: employee.specialization,
    token: await generateToken(employee.id),
  });
});

//To login an Employee
const loginEmployee = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const employee = await Employee.findOne({ email });

  if (employee && (await bcrypt.compare(password, employee.password))) {
    res.status(200).json({
      _id: employee.id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      phone: employee.phone,
      email: employee.email,
      specialization: employee.specialization,
      age: employee.age,
      address: employee.address,
      gender: employee.gender,
      specialization: employee.specialization,
      token: await generateToken(employee.id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.user._id);
  if (!employee) {
    res.status(401);
    throw new Error("Not Authorised");
  } else {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.user._id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      ...updatedEmployee._doc,
      token: await generateToken(updatedEmployee._id),
    });
  }
});

//get employees according to ids
const getIndividualEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id, {
    password: 0,
  });
  res.status(200).json(employee);
});

// Appointemnts Details Retrieval controller
const getAppoitments = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.user._id);
  if (!employee) {
    res.status(400);
    throw new Error("Not Authorized");
  } else {
    const engagements = await Engagements.find({ employee_id: employee._id });
    const appointmentData = engagements.map(async (engagement) => {
      const appointment = await Appointments.findById(
        engagement.appointment_id
      );
      const employer = await Employer.findById(engagement.employer_id, {
        password: 0,
      });
      return {
        appointment_booktime: appointment.appointment_booktime,
        employer: employer,
      };
    });
    res.status(200).json(appointmentData);
  }
});

const generateToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerEmployee,
  loginEmployee,
  updateEmployee,
  getEmployees,
  getIndividualEmployee,
  getAppoitments,
};
