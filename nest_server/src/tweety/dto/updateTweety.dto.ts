import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateTweetyDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  content?: string;
}
