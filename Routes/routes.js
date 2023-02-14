const express = require("express");
const router = express.Router();
const { HTTP_STATUS_CODES } = require("../domain/statusCodes");

const checkAuth = require("../middleware/checkAuth");
const { userSignUp, userLogin } = require("../Controllers/users");
const {
  registerPatient,
  deletePatient,
  getPatient,
  getUpdatePatient,
  putUpdatePatient,
  getAllPatient,
} = require("../Controllers/appointments");

router.get("/", (_, res, __) => {
  res.status(HTTP_STATUS_CODES.OK).json({ message: "working" });
});

router.post("/login", userLogin);
router.post("/signup", userSignUp);

router.post("/register_patient/", checkAuth, registerPatient);
router.delete("/delete_patient/:id", checkAuth, deletePatient);
router.get("/get_patient", checkAuth, getPatient);

router
  .put("/update_patient/:id", checkAuth, putUpdatePatient)
  .get("/update_patient/:id", checkAuth, getUpdatePatient);

router.get("/patients", getAllPatient);

module.exports = router;
