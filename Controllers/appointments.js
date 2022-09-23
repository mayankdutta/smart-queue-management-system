const Patient = require("../Models/Appointments");
require("dotenv").config()

const registerPatient = async (req, res, next) => {
    console.warn(req.body)

    try {
        const patient = new Patient({
            name: req.body.name,
            contactNumber: req.body.contactNumber,
            contactNumberFamilyMember: req.body.contactNumberFamilyMember,
            Address: req.body.address,
            doctor: req.body.doctor,
            registeredBy: req.body.registeredBy,
            tokenNumber: Patient.count() + 1,
            currentPenalty: req.body.currentPenalty,
        });
        const result = await patient.save();
        return res.status(200).send({
            message: "patient registered successfully",
            tempResult: {result}
        });
    } catch (err) {
        return res.status(400).send({message: err.message});
    }

}

const deletePatient = async (req, res, next) => {
    try {
        let patient = await Patient.deleteOne({_id: req.params.id})
        res.status(200).send(patient);
    } catch (err) {
        res.status(404).send({
            message: err
        });
    }
}

const getAllPatient = async (req, res) => {
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
    try {
        const patient = await Patient.find({registeredBy: req.body.registeredBy});
        res.send(patient);
    } catch (err) {
        res.status(401).send({
            result: "No such record"
        })
    }
}

const putUpdatePatient = async (req, res) => {
    try {
        let patient = await Patient.updateOne({_id: req.params.id}, {
            $set: req.body
        })
        res.status(200).send(patient);
    } catch (err) {
        res.status(404).send({
            message: err
        });
    }
}

const getUpdatePatient = async (req, res) => {
    try {
        let patient = await Patient.findOne({_id: req.params.id})
        res.send(patient)
    } catch (err) {
        res.status(404).send({
            message: err,
            result: "No record found"

        });
    }
}

module.exports = {registerPatient, deletePatient, getPatient, getUpdatePatient, putUpdatePatient, getAllPatient}