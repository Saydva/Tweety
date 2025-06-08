import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  // Password validation: at least 6 characters, one uppercase letter, one lowercase letter, and one number
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
    message:
      'Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.',
  })
  password: string;
}
