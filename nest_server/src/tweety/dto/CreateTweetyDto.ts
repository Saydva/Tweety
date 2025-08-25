import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTweetyDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
