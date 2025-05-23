import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateTweetyDto {
  @IsOptional()
  @IsString()
  userId?: string;
  @IsOptional()
  @IsString()
  content?: string;
  @IsOptional()
  @IsString()
  date?: string;
  @IsOptional()
  comments?: object[];
  @IsOptional()
  @IsNumber()
  likes?: number;
}
