import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';

export type ProjectDocument = Project & Document;

const options: SchemaOptions = {
  timestamps: true,
  id: false,
};
@Schema(options)
export class Project extends Document {
  @Prop({
    required: true,
  })
  name: string;

  @Prop()
  logo: string;

  @Prop({
    required: true,
  })
  url: string;

  @Prop()
  isActive: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
