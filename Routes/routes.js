const express = require('express');
const router = express.Router();

const {userSignUp, userLogin} = require('../Controllers/users')

router.get("/", (req, res, next) => {
    res.status(200).json({message: "working"});
});

router.post("/login", userLogin);
router.post("/signup", userSignUp);

// router.get("/getinfo", checkAuth, getInfo);
// router.post("/addinfo", checkAuth, addInfo);

// router.put("/updateinfo/:id", checkAuth, putUpdateInfo).get("/updateinfo/:id", checkAuth, getUpdateInfo);

// router.delete("/deleteinfo/:id", checkAuth, deleteInfo);

// router.delete("/updateuser/:id", (req, res, next) => {

// });

module.exports = router;