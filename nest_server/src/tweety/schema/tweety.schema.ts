import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Tweety {
  @ApiProperty({ example: 'user-id-here' })
  @Prop({ required: false })
  owner: string;

  @ApiProperty({ example: 'This is my first tweety!' })
  @Prop({ required: true })
  content: string;
}
export const TweetySchema = SchemaFactory.createForClass(Tweety);
