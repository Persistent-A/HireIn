const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: [true, 'Please enter your user-id']
    },
    first_name: {
        type: String,
        required: [true, 'Please enter your first name']
    },
    last_name: {
        type: String,
        required: [true, 'Please enter your last name']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password']
    }
},
{
    timestamp: true
})

module.exports = mongoose.model('Admin', adminSchema)