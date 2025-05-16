import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class createCommentDto {
  @IsOptional()
  @IsString()
  userId: string;
  @IsNotEmpty()
  @IsString()
  content: string;
  @IsNotEmpty()
  @IsString()
  date: string;
}
