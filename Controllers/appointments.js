const Patient = require("../Models/Appointments");
const Users = require("../Models/Users");
const getUserObject = require('../middleware/decodeUser');

require('dotenv').config();

const registerPatient = async (req, res, _) => {
  console.warn(req.body);

  try {
    const patient = new Patient({
      ...req.body,
    });
    const result = await patient.save();
    return res.status(200).send({
      message: 'patient registered successfully',
      tempResult: { result },
    });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

const deletePatient = async (req, res, next) => {
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
    if (!token || token.role != 'admin') return res.status(401).send('Not an Admin !')
    try {
        const data = await Patient.find();
        res.status(200).send(data);
    } catch (err) {
        res.status(404).send({
            result: "data not found",
            message: err
        })
    }
}

const getPatient = async (req, res, next) => {
    const registeredBy = req.headers['access-token'];
    try {
        const patient = await Patient.find({ registeredBy: registeredBy });
        res.status(200).send(patient);
    } catch (err) {
        res.status(401).send({
            result: "No such record"
        })
    }
}

const getUpdatePatient = async (req, res) => {
  const registeredBy = req.headers['access-token'];
  try {
    let patient = await Patient.find({
      registeredBy: registeredBy,
      _id: req.params.id,
    });
    res.status(200).send(patient);
  } catch (err) {
    res.status(404).send({
      message: err,
      result: 'No record found',
    });
  }
};

const putUpdatePatient = async (req, res) => {

    try {
        let patient = await Patient.updateOne({ _id: req.params.id }, {
            $set: req.body
        })
        res.status(200).send(patient);
    } catch (err) {
        res.status(404).send({
            message: err
        });
    }
}

const getUsers = async (req, res) => {
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

const getQueue = async(req, res) => {
    let date = req.body.date;
    try{
        const queueStatus = await Patient.find({date : date});
        res.status(200).send(queueStatus);
    }
    catch(error){
        res.status(500).send(error);
    }
}

module.exports = { registerPatient, deletePatient, getPatient, getUpdatePatient, putUpdatePatient, getAllPatient, getUsers, getQueue}

