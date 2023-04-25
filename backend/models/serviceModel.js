const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    service_name: {
        type: String,
    },
    service_description: {
        type: String
    }
},
{
    timestamp: true,
})

module.exports = mongoose.model('Services', serviceSchema)