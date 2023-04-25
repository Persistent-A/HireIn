const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel')
const Services = require('../models/serviceModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//To login an Employee
const loginAdmin = asyncHandler(async(req, res) => {
    console.log(req.body)
    const {user_id, password} = req.body
    
    if(!user_id || !password){
        res.status(400)
        throw new Error("Please enter all the fields")
    }

    const admin = await Admin.findOne({user_id})
    console.log(admin)

    if(admin && await bcrypt.compare(password, admin.password)){
        res.status(200).json({
            _id: admin.id,
            user_id: admin.user_id,
            first_name: admin.first_name,
            last_name: admin.last_name,
            token: await generateToken(admin.id)
        })
    }else{
        res.status(400)
        throw new Error("User not found")
    }
})

const addService = asyncHandler(async(req, res) => {
    const {service_name, service_description} = req.body
    const service = await Services.create({
        service_name,
        service_description
    })
    if(service){
        res.status(201).json({
            message: 'Service Added'
        })
    }else{
        res.status(400)
        throw new Error('Error in adding Service')
    }
})

const getServices = asyncHandler(async(req, res) => {
  const services = await Services.find({});
  res.status(200).json(services)
})

const generateToken = async(id) => {
    return await jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {loginAdmin, addService, getServices};
