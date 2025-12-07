import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/geopolitical-dashboard"

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully")
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err)
    process.exit(1)
  })

// Data Schema
const dataSchema = new mongoose.Schema(
  {
    end_year: String,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: String,
    impact: String,
    added: String,
    published: String,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number,
    city: String,
    swot: String,
  },
  { collection: "geopolitical_data" },
)

const Data = mongoose.model("Data", dataSchema)

// API Routes

// Get all data with optional filters
app.get("/api/data", async (req, res) => {
  try {
    const { country, region, topic, sector, pestle, source, swot, city, end_year, minIntensity, maxIntensity } = req.query

    const filter = {}
    if (country && country !== "All") filter.country = country
    if (region && region !== "All") filter.region = region
    if (topic && topic !== "All") filter.topic = topic
    if (sector && sector !== "All") filter.sector = sector
    if (pestle && pestle !== "All") filter.pestle = pestle
    if (source && source !== "All") filter.source = source
    if (swot && swot !== "All") filter.swot = swot
    if (city && city !== "All") filter.city = city
    if (end_year && end_year !== "All") filter.end_year = end_year

    if (minIntensity || maxIntensity) {
      filter.intensity = {}
      if (minIntensity) filter.intensity.$gte = Number.parseInt(minIntensity)
      if (maxIntensity) filter.intensity.$lte = Number.parseInt(maxIntensity)
    }

    const data = await Data.find(filter).limit(500)
    res.json(data)
  } catch (error) {
    console.error("Error fetching data:", error)
    res.status(500).json({ error: "Failed to fetch data" })
  }
})

// Get filter options (unique values)
app.get("/api/filters", async (req, res) => {
  try {
    const countries = await Data.distinct("country")
    const regions = await Data.distinct("region")
    const topics = await Data.distinct("topic")
    const sectors = await Data.distinct("sector")
    const pestles = await Data.distinct("pestle")
    const sources = await Data.distinct("source")
    const swots = await Data.distinct("swot")
    const cities = await Data.distinct("city")
    const end_years = await Data.distinct("end_year")

    res.json({
      countries: countries.filter(Boolean).sort(),
      regions: regions.filter(Boolean).sort(),
      topics: topics.filter(Boolean).sort(),
      sectors: sectors.filter(Boolean).sort(),
      pestles: pestles.filter(Boolean).sort(),
      sources: sources.filter(Boolean).sort(),
      swots: swots.filter(Boolean).sort(),
      cities: cities.filter(Boolean).sort(),
      end_years: end_years.filter(Boolean).sort(),
    })
  } catch (error) {
    console.error("Error fetching filters:", error)
    res.status(500).json({ error: "Failed to fetch filters" })
  }
})

// Get statistics
app.get("/api/stats", async (req, res) => {
  try {
    const { country, region, topic, sector, pestle, minIntensity, maxIntensity } = req.query

    const filter = {}
    if (country && country !== "All") filter.country = country
    if (region && region !== "All") filter.region = region
    if (topic && topic !== "All") filter.topic = topic
    if (sector && sector !== "All") filter.sector = sector
    if (pestle && pestle !== "All") filter.pestle = pestle

    if (minIntensity || maxIntensity) {
      filter.intensity = {}
      if (minIntensity) filter.intensity.$gte = Number.parseInt(minIntensity)
      if (maxIntensity) filter.intensity.$lte = Number.parseInt(maxIntensity)
    }

    const stats = await Data.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          avgIntensity: { $avg: "$intensity" },
          avgLikelihood: { $avg: "$likelihood" },
          avgRelevance: { $avg: "$relevance" },
          totalRecords: { $sum: 1 },
        },
      },
    ])

    const result = stats[0] || {
      avgIntensity: 0,
      avgLikelihood: 0,
      avgRelevance: 0,
      totalRecords: 0,
    }

    res.json(result)
  } catch (error) {
    console.error("Error fetching stats:", error)
    res.status(500).json({ error: "Failed to fetch stats" })
  }
})

// Get data grouped by country
app.get("/api/by-country", async (req, res) => {
  try {
    const { sector, topic, pestle } = req.query

    const filter = {}
    if (sector && sector !== "All") filter.sector = sector
    if (topic && topic !== "All") filter.topic = topic
    if (pestle && pestle !== "All") filter.pestle = pestle

    const data = await Data.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$country",
          avgIntensity: { $avg: "$intensity" },
          avgLikelihood: { $avg: "$likelihood" },
          avgRelevance: { $avg: "$relevance" },
          count: { $sum: 1 },
        },
      },
      { $sort: { avgIntensity: -1 } },
      { $limit: 10 },
    ])

    res.json(data)
  } catch (error) {
    console.error("Error fetching country data:", error)
    res.status(500).json({ error: "Failed to fetch country data" })
  }
})

// Get data grouped by year
app.get("/api/by-year", async (req, res) => {
  try {
    const { country, sector } = req.query

    const filter = {}
    if (country && country !== "All") filter.country = country
    if (sector && sector !== "All") filter.sector = sector

    const data = await Data.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$start_year",
          avgIntensity: { $avg: "$intensity" },
          avgLikelihood: { $avg: "$likelihood" },
          avgRelevance: { $avg: "$relevance" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ])

    res.json(data.filter((item) => item._id))
  } catch (error) {
    console.error("Error fetching yearly data:", error)
    res.status(500).json({ error: "Failed to fetch yearly data" })
  }
})

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

export default app
