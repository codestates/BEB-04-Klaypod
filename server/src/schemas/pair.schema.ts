import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaOptions } from 'mongoose';
import { Project } from './project.schema';

export type PairDocument = Pair & Document;

const options: SchemaOptions = {
  timestamps: true,
  id: false,
};

@Schema(options)
export class Pair extends Document {
  @Prop({
    required: true,
  })
  symbol: string;

  @Prop()
  logo: [string];

  @Prop({
    required: true,
  })
  tvl: string;

  @Prop({
    required: true,
  })
  apr: number;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  })
  project_id: Project;

  @Prop()
  isActive: boolean;
}
export const PairSchema = SchemaFactory.createForClass(Pair);
