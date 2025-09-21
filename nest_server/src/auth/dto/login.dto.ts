import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'test@.gmail.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345', description: 'User password' })
  @IsString()
  password: string;
}
