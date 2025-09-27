import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TweetyResponseDto {
  @ApiProperty({
    example: '64b7c2f4c9e1f2a5b6c7d8e9',
    description: 'Tweety ID',
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: 'This is my first tweety!',
    description: 'Content of the tweety',
  })
  @IsString()
  content: string;

  @ApiProperty({ example: 'John Doe', description: 'Owner of the tweety' })
  @IsString()
  owner: string;
}
