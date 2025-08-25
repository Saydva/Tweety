import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Tweety {
  @Prop({ required: false })
  userId: string;
  @Prop({ required: true })
  content: string;
}
export const TweetySchema = SchemaFactory.createForClass(Tweety);
