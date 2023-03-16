const jwt = require('jsonwebtoken')
const Employer = require('../models/employerModel')


const protect = async(req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = await req.headers.authorization.split(' ')[1]
            const decoded = await jwt.verify(token, process.env.JWT_SECRET)
            req.employer = await Employer.findById(decoded.id).select(-decoded.password)
            next()
        }
        catch(error){
            console.log(error)
            throw new Error('Not authorized')
        }
    }

    if(!token){
        res.status(400)
        throw new Error('No token found!')
    }

}

module.exports = protect;