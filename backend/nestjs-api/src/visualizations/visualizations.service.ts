// NestJS Service for Visualization Data Operations

import { Injectable } from "@nestjs/common"
import type { Model } from "mongoose"
import type { Visualization } from "./schemas/visualization.schema"

interface FilterOptions {
  country?: string | null
  region?: string | null
  topics?: string | null
  year?: number | null
  intensityMin?: number | null
  intensityMax?: number | null
}

@Injectable()
export class VisualizationsService {
  private visualizationModel: Model<Visualization>

  constructor(model: Model<Visualization>) {
    this.visualizationModel = model
  }

  // Find all visualizations
  async findAll(): Promise<Visualization[]> {
    return this.visualizationModel.find().limit(100).exec()
  }

  // Find filtered data
  async findFiltered(filters: FilterOptions): Promise<Visualization[]> {
    const query: any = {}

    if (filters.country) query.country = filters.country
    if (filters.region) query.region = filters.region
    if (filters.topics) query.topics = filters.topics
    if (filters.year) query.year = filters.year

    if (filters.intensityMin !== null || filters.intensityMax !== null) {
      query.intensity = {}
      if (filters.intensityMin !== null) query.intensity.$gte = filters.intensityMin
      if (filters.intensityMax !== null) query.intensity.$lte = filters.intensityMax
    }

    return this.visualizationModel.find(query).exec()
  }

  // Get aggregated statistics
  async getStats(): Promise<any> {
    const stats = await this.visualizationModel
      .aggregate([
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
      .exec()

    return stats[0] || {}
  }

  // Group by country
  async groupByCountry(): Promise<any[]> {
    return this.visualizationModel
      .aggregate([
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
      .exec()
  }

  // Group by year
  async groupByYear(): Promise<any[]> {
    return this.visualizationModel
      .aggregate([
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
      .exec()
  }

  // Group by topic
  async groupByTopic(): Promise<any[]> {
    return this.visualizationModel
      .aggregate([
        {
          $group: {
            _id: "$topics",
            avgIntensity: { $avg: "$intensity" },
            avgLikelihood: { $avg: "$likelihood" },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ])
      .exec()
  }

  // Get unique filter options
  async getFilterOptions(): Promise<any> {
    const [countries, regions, topics, years] = await Promise.all([
      this.visualizationModel.distinct("country"),
      this.visualizationModel.distinct("region"),
      this.visualizationModel.distinct("topics"),
      this.visualizationModel.distinct("year"),
    ])

    return {
      countries: countries.sort(),
      regions: regions.sort(),
      topics: topics.sort(),
      years: years.sort(),
    }
  }
}
