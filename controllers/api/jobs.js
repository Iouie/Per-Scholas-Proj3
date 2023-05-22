const Job = require("../../models/Job");

const index = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json(jobs);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

const create = async (req, res) => {};

module.exports = { index };
