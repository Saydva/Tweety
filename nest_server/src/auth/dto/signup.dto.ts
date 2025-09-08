import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  // At least 6 characters
  @Matches(/^.{6,}$/, {
    message: 'Password must be at least 6 characters.',
  })
  password: string;
}
