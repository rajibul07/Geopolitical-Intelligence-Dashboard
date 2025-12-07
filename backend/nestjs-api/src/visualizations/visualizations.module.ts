// Visualization Module Configuration

import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { VisualizationsController } from "./visualizations.controller"
import { VisualizationsService } from "./visualizations.service"
import { Visualization, VisualizationSchema } from "./schemas/visualization.schema"

@Module({
  imports: [MongooseModule.forFeature([{ name: Visualization.name, schema: VisualizationSchema }])],
  controllers: [VisualizationsController],
  providers: [VisualizationsService],
})
export class VisualizationsModule {}
