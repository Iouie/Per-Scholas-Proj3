const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");
const ensuredLoggedIn = require("../../config/ensuredLoggedIn");

// POST /api/users
// OLD WAY
// router.post("/", (req, res) => {});

router.post("/", usersCtrl.create);

// POST /api/users/login
router.post("/login", usersCtrl.login);

// GET /api/users/check-token
router.get("/check-token", ensuredLoggedIn, usersCtrl.checkToken);

module.exports = router;
