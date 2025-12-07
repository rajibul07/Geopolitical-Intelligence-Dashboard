// Example NestJS Controller for the Visualization API
// File: src/visualizations/visualizations.controller.ts

/*
import { Controller, Get, Query } from '@nestjs/common';
import { VisualizationsService } from './visualizations.service';

@Controller('api/visualizations')
export class VisualizationsController {
  constructor(private readonly visualizationsService: VisualizationsService) {}

  @Get()
  async getAll() {
    return this.visualizationsService.findAll();
  }

  @Get('/filter')
  async getFiltered(
    @Query('country') country?: string,
    @Query('region') region?: string,
    @Query('topics') topics?: string,
    @Query('year') year?: number,
    @Query('intensityMin') intensityMin?: number,
    @Query('intensityMax') intensityMax?: number,
  ) {
    return this.visualizationsService.findFiltered({
      country,
      region,
      topics,
      year,
      intensityMin,
      intensityMax,
    });
  }

  @Get('/stats')
  async getStats() {
    return this.visualizationsService.getStats();
  }

  @Get('/by-country')
  async getByCountry() {
    return this.visualizationsService.groupByCountry();
  }

  @Get('/by-year')
  async getByYear() {
    return this.visualizationsService.groupByYear();
  }
}
*/
