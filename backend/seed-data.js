import mongoose from "mongoose"
import dotenv from "dotenv"
import fs from "fs"
import path from "path"

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/geopolitical-dashboard"

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
  },
  { collection: "geopolitical_data" },
)

const Data = mongoose.model("Data", dataSchema)

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB...")
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log("Connected to MongoDB")

    // Clear existing data
    await Data.deleteMany({})
    console.log("Cleared existing data")

    // Read JSON file
    const jsonPath = path.resolve("jsondata.json")
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"))

    // Insert data
    console.log(`Inserting ${jsonData.length} records...`)
    const result = await Data.insertMany(jsonData)
    console.log(`Successfully inserted ${result.length} records`)

    // Create indexes
    await Data.collection.createIndex({ country: 1 })
    await Data.collection.createIndex({ region: 1 })
    await Data.collection.createIndex({ topic: 1 })
    await Data.collection.createIndex({ sector: 1 })
    await Data.collection.createIndex({ intensity: 1 })
    console.log("Indexes created")

    await mongoose.disconnect()
    console.log("Database seeding completed successfully")
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()
