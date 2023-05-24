const express = require("express");
const router = express.Router();
const jobsCtrl = require("../../controllers/api/jobs");

// Index
router.get("/", jobsCtrl.read);

// Create
router.post("/", jobsCtrl.create);

// Update
router.put("/:id", jobsCtrl.update);

// Delete
router.delete("/:id", jobsCtrl.deleteJob);

module.exports = router;
