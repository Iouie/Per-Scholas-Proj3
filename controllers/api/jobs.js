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
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(job);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const deleteJob = await Job.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteJob);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

module.exports = { read, create, update, deleteJob };
