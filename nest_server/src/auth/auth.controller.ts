import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthGuard } from 'src/guards/auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //TODO: Post SignUp
  @Post('signup')
  @UsePipes(new ValidationPipe())

  //auth/signup'
  async signUp(@Body() SignUpData: SignUpDto) {
    return this.authService.signup(SignUpData);

    // Implement sign-up logic here
  }
  //TODO: Post Login

  @Post('login')
  async login(@Body() loginData: LoginDto) {
    return this.authService.login(loginData);
    // Implement login logic here
  }

  @Post('refresh')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    //TODO: Refresh Token
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
    // Implement refresh token logic here
  }

  @Get(`/users`)
  async findUsers(@Body() body: any) {
    return this.authService.findUser();
    // Implement test logic here
  }
}
