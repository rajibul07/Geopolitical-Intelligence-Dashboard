// MongoDB Schema Definition for Data Visualization Dashboard

const visualizationSchema = {
  collectionName: "visualizations",
  schema: {
    _id: { type: "ObjectId", required: true, description: "Unique identifier" },
    intensity: {
      type: "Number",
      min: 0,
      max: 100,
      required: true,
      description: "Intensity metric (0-100)",
    },
    likelihood: {
      type: "Number",
      min: 0,
      max: 100,
      required: true,
      description: "Likelihood metric (0-100)",
    },
    relevance: {
      type: "Number",
      min: 0,
      max: 100,
      required: true,
      description: "Relevance metric (0-100)",
    },
    year: {
      type: "Number",
      required: true,
      description: "Year of the data point",
    },
    country: {
      type: "String",
      required: true,
      index: true,
      description: "Country name",
    },
    topics: {
      type: "String",
      required: true,
      index: true,
      description: "Topic category",
    },
    region: {
      type: "String",
      required: true,
      index: true,
      description: "Geographic region",
    },
    city: {
      type: "String",
      required: true,
      description: "City name",
    },
    createdAt: {
      type: "Date",
      default: "new Date()",
      description: "Timestamp of record creation",
    },
  },
  indices: [{ key: "country" }, { key: "region" }, { key: "topics" }, { key: "year" }],
}

module.exports = { visualizationSchema }
