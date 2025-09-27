import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'john@gmail.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '64a7b2f4c9e1f2a5b6c7d8e9', description: 'User ID' })
  @IsString()
  _id: string;
}
