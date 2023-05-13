const jwt = require("jsonwebtoken");
const Employer = require("../models/employerModel");
const Employee = require("../models/employeeModel");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = await req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = await Employee.findById(decoded.id).select(-decoded.password);
      if (!req.user) {
        req.user = await Employer.findById(decoded.id).select(
          -decoded.password
        );
      }
      next();
    } catch (error) {
      console.log(error);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(400);
    throw new Error("No token found!");
  }
};

module.exports = protect;
