import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class User extends Document {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'test@gmail.com', description: 'User email' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ example: 'strongPassword123', description: 'User password' })
  @Prop({ required: true })
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
