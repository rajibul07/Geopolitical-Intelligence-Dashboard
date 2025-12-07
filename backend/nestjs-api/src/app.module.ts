// NestJS App Module

import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { VisualizationsModule } from "./visualizations/visualizations.module"

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || "mongodb://localhost:27017/dashboard"),
    VisualizationsModule,
  ],
})
export class AppModule {}
