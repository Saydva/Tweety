import { ApiProperty } from '@nestjs/swagger';

export class TweetyResponseDto {
  @ApiProperty({
    example: '64b7c2f4c9e1f2a5b6c7d8e9',
    description: 'Tweety ID',
  })
  _id: string;

  @ApiProperty({
    example: 'This is my first tweety!',
    description: 'Content of the tweety',
  })
  content: string;

  @ApiProperty({ example: 'John Doe', description: 'Owner of the tweety' })
  owner: string;
}
