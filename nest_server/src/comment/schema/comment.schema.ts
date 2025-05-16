import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Comment {
  @Prop({ required: false })
  userId: string;
  @Prop({ required: true })
  content: string;
  @Prop({ required: true })
  date: string;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);
