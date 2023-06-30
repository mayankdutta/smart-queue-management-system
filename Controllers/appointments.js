const Patient = require('../Models/Appointments');
const Users = require('../Models/Users');
const getUserObject = require('../middleware/decodeUser');
const { HTTP_STATUS_CODES } = require('../domain/statusCodes');

require('dotenv').config();

const registerPatient = async (req, res) => {
  console.log("registering pateint");
  console.log(req.body.registeredBy);

  try {
    const patient = new Patient({
      ...req.body,
      registeredBy: req.body.registeredBy
    });
    const result = await patient.save();
    return res.status(HTTP_STATUS_CODES.OK).send({
      message: 'patient registered successfully',
      tempResult: { result },
    });
  } catch (err) {
    return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({ message: err.message });
  }
};

const deletePatient = async (req, res) => {
  try {
    let patient = await Patient.deleteOne({ _id: req.params.id })
    res.status(200).send(patient);
  } catch (err) {
    res.status(404).send({
      message: err
    });
  }
}

const getAllPatient = async (req, res) => {
  const token = getUserObject(req.headers['access-token']);

  if (!token || token.role != 'admin')
    return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send('Not an Admin !');

  try {
    const data = await Patient.find();
    res.status(HTTP_STATUS_CODES.OK).send(data);
  } catch (err) {
    res.status(HTTP_STATUS_CODES.NOT_FOUND).send({
      result: 'data not found',
      message: err,
    });
  }
};

const getPatient = async (req, res) => {
  const registeredBy = req.headers['email'];
  // console.log("registeredBy: ", registeredBy);

  try {
    const patient = await Patient.find({ registeredBy: registeredBy });
    console.log("patients: ", patient);
    res.status(200).send(patient);
  } catch (err) {
    res.status(401).send({
      result: "No such record"
    })
  }
}

const getUpdatePatient = async (req, res) => {
  const registeredBy = getUserObject(req.headers['access-token']).email;

  try {
    let patient = await Patient.find({
      registeredBy: registeredBy,
      _id: req.params.id,
    });
    res.status(HTTP_STATUS_CODES.OK).send(patient);
  } catch (err) {
    res.status(HTTP_STATUS_CODES.NOT_FOUND).send({
      message: err,
      result: 'No record found',
    });
  }
};

const putUpdatePatient = async ({ body, params: { id: _id = null } }, res) => {

  try {
    let patient = await Patient.updateOne({ _id }, {
      $set: body
    })
    res.status(200).send(patient);
  } catch (err) {
    res.status(404).send({
      message: err
    });
  }
}

const getUsers = async (req = {}, res) => {
  let token = getUserObject(req.headers['access-token']);
  if (!token || token.role != "admin") return res.status(401).send('Not an Admin !')
  try {
    const data = await Users.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(404).send({
      result: "User not found",
      message: err
    })
  }
}

const getQueue = async ({ body }, res) => {
  let { date } = body;
  // console.log("data: ", date);
  try {
    if (!date) return res.status(400).send({ "message": "Please Select a date" });

    const queueStatus = await Patient.find({ date });

    if (!queueStatus.length) return res.status(404).send({
      "message": `No appointments on ${date}`
    })
    res.status(200).send(queueStatus);

  }
  catch (error) {
    res.status(500).send(error);
  }
}

module.exports =
{
  registerPatient,
  deletePatient,
  getAllPatient,
  getPatient,
  getUpdatePatient,
  putUpdatePatient,
  getUsers,
  getQueue
}
