/**
 * Schema for appointments
 * 1. Time
 * 2. Priority
 * 3. Initial_rank
 * 4. Expected_time
 * */



const mongoose = require('mongoose')
const AppointmentsSchema = new mongoose.Schema({
    name: String,
    contactNumber: String,
    contactNumberFamilyMember: String,
    Address: String,
    doctor: String,
    registeredBy: String, // logged in register who registered him.
    tokenNumber: String,
})

const Appointments = mongoose.model('Appointments', AppointmentsSchema)
module.exports = Appointments;