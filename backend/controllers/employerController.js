const asyncHandler = require('express-async-handler')
const Employer = require('../models/employerModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//To Register a Employer
const registerEmployer = asyncHandler(async(req, res) => {
    const {first_name, last_name, phone, email, password} = req.body


    if(!first_name || !last_name || !phone || !email || !password){
        res.status(400)
        throw new Error("Please enter all the fields!")
    }

    const employerExists = await Employer.findOne({email})
    if(employerExists) {
        res.status(400)
        throw new Error('User already exists!')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const employer = await Employer.create({
        first_name, 
        last_name,
        age: null,
        gender: null, 
        phone, 
        email, 
        password: hashedPassword,
        address: null,
    })

    if(!employer){
        res.status(400)
        throw new Error("Account not created")
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
        token: await generateToken(employer.id)
    })
})

//To login a Employer
const loginEmployer = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    
    if(!email || !password){
        res.status(400)
        throw new Error("Please enter all the fields")
    }

    const employer = await Employer.findOne({email})

    if(employer && await bcrypt.compare(password, employer.password)){
        res.status(200).json({
            _id: employer.id,
            first_name: employer.first_name,
            last_name: employer.last_name,
            age: employer.age,
            gender: employer.gender, 
            phone: employer.phone,
            email: employer.email,
            address: employer.address,
            token: await generateToken(employer.id)
        })
    }else{
        res.status(400)
        throw new Error("User not found")
    }
    })

    const updateEmployer = asyncHandler(async(req, res) => {
        console.log(req.body)
        const employer = await Employer.findById(req.user._id)
        if (!employer) {
            res.status(401)
            throw new Error('Not Authorised')
        }
        else {
            const updatedEmployer = await Employer.findByIdAndUpdate(req.user._id, req.body, {
                new: true
            })
            res.status(200). json(updatedEmployer)
        }
    })

const generateToken = async(id) => {
    return await jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {registerEmployer, loginEmployer, updateEmployer};
