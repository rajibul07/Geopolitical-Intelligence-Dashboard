// Mongoose Model for Visualization Collection

const mongoose = require("mongoose")

const visualizationSchema = new mongoose.Schema({
  intensity: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  likelihood: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  relevance: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  year: {
    type: Number,
    required: true,
    index: true,
  },
  country: {
    type: String,
    required: true,
    index: true,
  },
  topics: {
    type: String,
    required: true,
    index: true,
  },
  region: {
    type: String,
    required: true,
    index: true,
  },
  city: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Visualization", visualizationSchema)
