const mongoose = require('mongoose')

const appointmentsSchema = mongoose.Schema({
    appointment_booktime: {
        type: Date
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Appointments', appointmentsSchema)