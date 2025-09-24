import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  name: string;

  @ApiProperty({ example: '64b7f8c9e1b2c3d4e5f6a7b8', description: 'User ID' })
  _id: string;

  @ApiProperty({
    example: { accessToken: 'string', refreshToken: 'string' },
    description: 'Authentication tokens',
  })
  tokens: { accessToken: string; refreshToken: string };
}
