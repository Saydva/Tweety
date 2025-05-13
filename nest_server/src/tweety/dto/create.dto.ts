import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTweetyDto {
  @IsOptional()
  @IsString()
  userId: string;
  @IsString()
  @IsNotEmpty()
  content: string;
}
