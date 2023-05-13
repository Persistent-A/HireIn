const asyncHandler = require("express-async-handler");
const Employee = require("../models/employeeModel");
const Employer = require("../models/employerModel");
const Appointments = require("../models/appointmentModel");
const Engagements = require("../models/engagementsModel");

const requestEmployee = asyncHandler(async (req, res) => {
  const { employee_id, employer_id } = req.body;
  const employee = await Employee.findById(employee_id);
  const employer = await Employer.findById(employer_id);
  if (!employee) {
    res.status(400);
    throw new Error("Error retrieving Employees information");
  }
  if (!employer) {
    res.status(400);
    throw new Error("Error retrieving employee data");
  }
  const appointment = await Appointments.create({
    appointment_booktime: Date.now(),
  });
  const engagement = await Engagements.create({
    employer_id: employer._id,
    employee_id: employee._id,
    appointment_id: appointment._id,
  });
  if (engagement) {
    res.status(201).json({ message: "Appointment booked" });
  } else {
    res.status(400);
    throw new Error("Error Booking an Appointment");
  }
});

const getAppointments = asyncHandler(async (req, res) => {
  const engagement = await Engagements.find({ employee: req.employee._id })
    .populate("employer_id", "first_name last_name email")
    .populate("employer_id", "first_name last_name email")
    .populate("appointment_id")
    .exec();
  res.status(200).json(engagement);
});

module.exports = { requestEmployee, getAppointments };
