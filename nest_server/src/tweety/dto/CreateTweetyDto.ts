import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTweetyDto {
  @ApiProperty({ example: 'user-id-here' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ example: 'This is my first tweety!' })
  @IsNotEmpty()
  @IsString()
  content: string;
}
