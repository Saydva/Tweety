import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document, Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class RefreshToken extends Document {
  @ApiProperty({ example: 'your-refresh-token-here' })
  @Prop({ required: true, unique: true })
  token: string;

  @ApiProperty({ example: 'user-id-here' })
  @Prop({ required: true, type: Types.ObjectId })
  userId: Types.ObjectId;

  @ApiProperty({ example: '2024-12-31T23:59:59.999Z' })
  @Prop({ required: true })
  expiryDate: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
