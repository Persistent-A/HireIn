const mongoose = require("mongoose")

const engagementSchema = mongoose.Schema({
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Cant map relative with engagements"],
        ref: "Employee"
    },
    appointment_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Cant map appointment with engagements"],
        ref: "Appointments"
    },
    employer_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Cant map  with engagements"],
        ref: "Employer"
    },
},
{
    timestamps: true
})

module.exports = mongoose.model("Engagements", engagementSchema);