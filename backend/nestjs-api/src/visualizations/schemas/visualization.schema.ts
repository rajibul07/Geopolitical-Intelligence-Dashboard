// Visualization Schema for MongoDB

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema()
export class Visualization extends Document {
  @Prop({ required: true, min: 0, max: 100 })
  intensity: number

  @Prop({ required: true, min: 0, max: 100 })
  likelihood: number

  @Prop({ required: true, min: 0, max: 100 })
  relevance: number

  @Prop({ required: true, index: true })
  year: number

  @Prop({ required: true, index: true })
  country: string

  @Prop({ required: true, index: true })
  topics: string

  @Prop({ required: true, index: true })
  region: string

  @Prop({ required: true })
  city: string

  @Prop({ default: Date.now })
  createdAt: Date
}

export const VisualizationSchema = SchemaFactory.createForClass(Visualization)
