// NestJS Controller for Visualization API
// Usage: nest new visualization-api

import { Controller, Get } from "@nestjs/common"
import type { VisualizationsService } from "./visualizations.service"

@Controller("api/visualizations")
export class VisualizationsController {
  constructor(private readonly visualizationsService: VisualizationsService) {}

  // Get all visualizations
  @Get()
  async getAll() {
    return this.visualizationsService.findAll()
  }

  // Get filtered data
  @Get("filter")
  async getFiltered(
    country?: string,
    region?: string,
    topics?: string,
    year?: string,
    intensityMin?: string,
    intensityMax?: string,
  ) {
    return this.visualizationsService.findFiltered({
      country: country || null,
      region: region || null,
      topics: topics || null,
      year: year ? Number.parseInt(year) : null,
      intensityMin: intensityMin ? Number.parseInt(intensityMin) : null,
      intensityMax: intensityMax ? Number.parseInt(intensityMax) : null,
    })
  }

  // Get aggregated statistics
  @Get("stats")
  async getStats() {
    return this.visualizationsService.getStats()
  }

  // Get data grouped by country
  @Get("by-country")
  async getByCountry() {
    return this.visualizationsService.groupByCountry()
  }

  // Get data grouped by year
  @Get("by-year")
  async getByYear() {
    return this.visualizationsService.groupByYear()
  }

  // Get data grouped by topic
  @Get("by-topic")
  async getByTopic() {
    return this.visualizationsService.groupByTopic()
  }

  // Get unique filter values
  @Get("filter-options")
  async getFilterOptions() {
    return this.visualizationsService.getFilterOptions()
  }
}
