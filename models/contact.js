const mongoose = require('mongoose');

// creation of schema
const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    }
})

// collection

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;