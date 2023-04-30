/**
 * Schema for appointments
 * 1. Time
 * 2. Priority
 * 3. Initial_rank
 * 4. Expected_time
 * */

const mongoose = require('mongoose');
const AppointmentsSchema = new mongoose.Schema({
  name: String,
  contactNumber: String,
  contactNumberFamilyMember: String,
  address: String,
  doctor: String,
  registeredBy: String, // logged in register who registered him.
  tokenNumber: String,
  currentPenalty: String,
  bodyTemperature: String,
  age: String,
  weight: String, // can be measured @clinic, if known then filled.
  bloodType: String,
  bloodPressure: String, // can be measured @clinic as well as self.
  // motive: String,
  oxygenLevel: String, // can be measured @clinic as well as self.
  description: String, // to be filled by compounder, adhoc Case, sucide, chakku, banduuk, ladai, accident., ilaaj se phele FIR., NIL Allowed
  date: String,
  gender: String,

  // typeOfCase: String,
  /*
    1. Consult
    2. adhocCase,
    3. Test
    4. Refer to another.
    5. Review tests
    6. Regular mareej, to check progress.
    7. previous doctor. keep their priority higher then regular.

    assign priority in the following order.
     */
});

const Appointments = mongoose.model('Appointments', AppointmentsSchema);
module.exports = Appointments;
