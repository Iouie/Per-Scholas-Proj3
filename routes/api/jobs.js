const express = require("express");
const router = express.Router();
const jobsCtrl = require("../../controllers/api/jobs");

// Index
router.get("/", jobsCtrl.read);

// Create
router.post("/", jobsCtrl.create);

// Update
router.put("/", jobsCtrl.update);
// Delete

module.exports = router;
