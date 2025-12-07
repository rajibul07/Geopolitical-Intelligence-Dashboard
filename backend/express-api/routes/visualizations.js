// Express.js Routes for Visualization API
// Usage: npm install express mongoose

const express = require("express")
const router = express.Router()
const Visualization = require("../models/Visualization")

// Get all visualizations
router.get("/api/visualizations", async (req, res) => {
  try {
    const data = await Visualization.find().limit(100)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get filtered data
router.get("/api/visualizations/filter", async (req, res) => {
  try {
    const { country, region, topics, year, intensityMin, intensityMax } = req.query

    const filter = {}
    if (country) filter.country = country
    if (region) filter.region = region
    if (topics) filter.topics = topics
    if (year) filter.year = Number.parseInt(year)
    if (intensityMin || intensityMax) {
      filter.intensity = {}
      if (intensityMin) filter.intensity.$gte = Number.parseInt(intensityMin)
      if (intensityMax) filter.intensity.$lte = Number.parseInt(intensityMax)
    }

    const data = await Visualization.find(filter)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get aggregated stats
router.get("/api/visualizations/stats", async (req, res) => {
  try {
    const stats = await Visualization.aggregate([
      {
        $group: {
          _id: null,
          avgIntensity: { $avg: "$intensity" },
          avgLikelihood: { $avg: "$likelihood" },
          avgRelevance: { $avg: "$relevance" },
          maxIntensity: { $max: "$intensity" },
          minIntensity: { $min: "$intensity" },
          totalRecords: { $sum: 1 },
        },
      },
    ])
    res.json(stats[0] || {})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get data by country
router.get("/api/visualizations/by-country", async (req, res) => {
  try {
    const data = await Visualization.aggregate([
      {
        $group: {
          _id: "$country",
          avgIntensity: { $avg: "$intensity" },
          avgLikelihood: { $avg: "$likelihood" },
          avgRelevance: { $avg: "$relevance" },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ])
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get data by year
router.get("/api/visualizations/by-year", async (req, res) => {
  try {
    const data = await Visualization.aggregate([
      {
        $group: {
          _id: "$year",
          avgIntensity: { $avg: "$intensity" },
          avgLikelihood: { $avg: "$likelihood" },
          avgRelevance: { $avg: "$relevance" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ])
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get filter options
router.get("/api/visualizations/filter-options", async (req, res) => {
  try {
    const [countries, regions, topics, years] = await Promise.all([
      Visualization.distinct("country"),
      Visualization.distinct("region"),
      Visualization.distinct("topics"),
      Visualization.distinct("year"),
    ])

    res.json({
      countries: countries.sort(),
      regions: regions.sort(),
      topics: topics.sort(),
      years: years.sort((a, b) => a - b),
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
