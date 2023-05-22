const Job = require("../../models/Job");

const read = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user._id });
    res.status(200).json(jobs);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

const create = async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, userId: req.user._id });
    res.status(200).json(job);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

const update = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params, req.body, {
      new: true,
    });
    console.log(job);
    res.status(200).json(job);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

module.exports = { read, create, update };
