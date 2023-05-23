const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const jobSchema = new Schema(
  {
    position: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    userId: { type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
