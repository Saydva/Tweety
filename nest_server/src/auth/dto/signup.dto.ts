import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'test@gmail.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongPassword123', description: 'User password' })
  @IsString()
  @MinLength(6)
  @Matches(/^.{6,}$/, {
    message: 'Password must be at least 6 characters.',
  })
  password: string;
}
