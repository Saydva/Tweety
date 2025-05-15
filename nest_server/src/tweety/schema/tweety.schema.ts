import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Tweety {
  @Prop({ required: false })
  userId: string;
  @Prop({ required: true })
  content: string;
  @Prop({ required: true })
  date: string;
}
export const TweetySchema = SchemaFactory.createForClass(Tweety);
