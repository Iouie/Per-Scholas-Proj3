const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const jobSchema = new Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
