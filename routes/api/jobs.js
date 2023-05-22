const express = require("express");
const router = express.Router();
const jobsCtrl = require("../../controllers/api/jobs");

// Index
router.get("/dashboard", jobsCtrl.index);

// Create
router.post("/dashboard", jobsCtrl.create);
