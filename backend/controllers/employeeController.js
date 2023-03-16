const asyncHandler = require('express-async-handler')
const Employee = require('../models/employeeModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//To Register an Employee
const registerEmployee = asyncHandler(async(req, res) => {
    const {first_name, last_name, phone, email, password} = req.body

    if(!first_name || !last_name || !phone || !email || !password){
        res.status(400)
        throw new Error("Please enter all the fields!")
    }

    const employeeExists = await Employee.findOne({email})
    if(employeeExists) {
        res.status(400)
        throw new Error('User already exists!')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const employee = await Employee.create({
        first_name, 
        last_name, 
        phone, 
        email, 
        password: hashedPassword
    })

    if(!employee){
        res.status(400)
        throw new Error("Account not registered")
    }

    res.status(201).json({
        _id: employee.id,
        first_name: employee.first_name,
        last_name: employee.last_name,
        phone: employee.phone,
        email: employee.email,
        token: await generateToken(employee.id)
    })
    
    res.status(201).json({message: "You are registered"})
})

//To login an Employee
const loginEmployee = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    
    if(!email || !password){
        res.status(400)
        throw new Error("Please enter all the fields")
    }

    const employee = await Employer.findOne({email})

    if(employee && await bcrypt.compare(password, employee.password)){
        res.status(200).json({
            _id: employee.id,
            first_name: employee.first_name,
            last_name: employee.last_name,
            phone: employee.phone,
            email: employee.email,
            token: await generateToken(employee.id)
        })
    }else{
        res.status(400)
        throw new Error("User not found")
    }
})

const generateToken = async(id) => {
    return await jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {registerEmployee, loginEmployee};
