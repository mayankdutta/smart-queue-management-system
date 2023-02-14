const express = require('express');
const router = express.Router();

const checkAuth = require("../middleware/checkAuth")
const {userSignUp, userLogin} = require('../Controllers/users')
const {
    registerPatient,
    deletePatient,
    getPatient,
    getUpdatePatient,
    putUpdatePatient,
    getAllPatient,
    getUsers
} = require('../Controllers/appointments')

router.get("/", (req, res, next) => {
    res.status(200).json({message: "working"});
});

router.post("/login", userLogin);
router.post("/signup", userSignUp);

router.post("/register_patient/", checkAuth, registerPatient);
router.delete("/delete_patient/:id", checkAuth, deletePatient);
router.get("/get_patient", checkAuth, getPatient);

router.put("/update_patientlocalhost:5000/signup//:id", checkAuth, putUpdatePatient)
    .get("/update_patient/:id", checkAuth, getUpdatePatient);

router.get("/patients", getAllPatient);
router.get("/users", getUsers);

module.exports = router;
