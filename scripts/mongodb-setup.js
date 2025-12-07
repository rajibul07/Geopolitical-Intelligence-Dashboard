// MongoDB Collection Setup Script
// This script creates a collection with sample data for the visualization dashboard

// Sample data structure for the Data Visualization Dashboard
const sampleData = [
  {
    _id: "1",
    intensity: 85,
    likelihood: 75,
    relevance: 90,
    year: 2023,
    country: "United States",
    topics: "Artificial Intelligence",
    region: "North America",
    city: "New York",
    createdAt: new Date("2023-01-15"),
  },
  {
    _id: "2",
    intensity: 72,
    likelihood: 68,
    relevance: 78,
    year: 2023,
    country: "United Kingdom",
    topics: "Climate Change",
    region: "Europe",
    city: "London",
    createdAt: new Date("2023-02-20"),
  },
  {
    _id: "3",
    intensity: 88,
    likelihood: 82,
    relevance: 85,
    year: 2023,
    country: "India",
    topics: "Data Security",
    region: "Asia",
    city: "Bangalore",
    createdAt: new Date("2023-03-10"),
  },
  {
    _id: "4",
    intensity: 65,
    likelihood: 72,
    relevance: 70,
    year: 2023,
    country: "Germany",
    topics: "Renewable Energy",
    region: "Europe",
    city: "Berlin",
    createdAt: new Date("2023-04-05"),
  },
  {
    _id: "5",
    intensity: 92,
    likelihood: 88,
    relevance: 95,
    year: 2024,
    country: "China",
    topics: "Artificial Intelligence",
    region: "Asia",
    city: "Shanghai",
    createdAt: new Date("2024-01-12"),
  },
  {
    _id: "6",
    intensity: 78,
    likelihood: 75,
    relevance: 82,
    year: 2024,
    country: "Canada",
    topics: "Climate Change",
    region: "North America",
    city: "Toronto",
    createdAt: new Date("2024-02-18"),
  },
  {
    _id: "7",
    intensity: 81,
    likelihood: 79,
    relevance: 88,
    year: 2024,
    country: "Australia",
    topics: "Cybersecurity",
    region: "Oceania",
    city: "Sydney",
    createdAt: new Date("2024-03-22"),
  },
  {
    _id: "8",
    intensity: 70,
    likelihood: 65,
    relevance: 72,
    year: 2024,
    country: "Brazil",
    topics: "Blockchain",
    region: "South America",
    city: "São Paulo",
    createdAt: new Date("2024-04-08"),
  },
  {
    _id: "9",
    intensity: 86,
    likelihood: 80,
    relevance: 92,
    year: 2024,
    country: "Japan",
    topics: "Internet of Things",
    region: "Asia",
    city: "Tokyo",
    createdAt: new Date("2024-05-14"),
  },
  {
    _id: "10",
    intensity: 75,
    likelihood: 70,
    relevance: 80,
    year: 2024,
    country: "France",
    topics: "Data Security",
    region: "Europe",
    city: "Paris",
    createdAt: new Date("2024-06-09"),
  },
  {
    _id: "11",
    intensity: 89,
    likelihood: 85,
    relevance: 90,
    year: 2025,
    country: "United States",
    topics: "Quantum Computing",
    region: "North America",
    city: "San Francisco",
    createdAt: new Date("2025-01-05"),
  },
  {
    _id: "12",
    intensity: 73,
    likelihood: 69,
    relevance: 76,
    year: 2025,
    country: "Singapore",
    topics: "Artificial Intelligence",
    region: "Asia",
    city: "Singapore",
    createdAt: new Date("2025-02-11"),
  },
]

// MongoDB Connection String (replace with your actual MongoDB URI)
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/dashboard"

console.log("MongoDB Setup Script")
console.log("==================")
console.log(`Database URI: ${MONGODB_URI}`)
console.log(`Sample data records: ${sampleData.length}`)
console.log("\nTo populate your MongoDB database:")
console.log("1. Install MongoDB locally or use MongoDB Atlas")
console.log("2. Update MONGODB_URI in this file or set MONGODB_URI environment variable")
console.log("3. Use this data in your backend application")
console.log("\nSample data ready for insertion into 'visualizations' collection")

// Export for use in Node.js/NestJS backend
module.exports = { sampleData, MONGODB_URI }
