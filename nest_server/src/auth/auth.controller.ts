import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from 'src/_guards/authGuard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signUp(@Body() SignUpData: SignUpDto) {
    return this.authService.signup(SignUpData);
  }

  @Post('login')
  async login(@Body() loginData: LoginDto) {
    return this.authService.login(loginData);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Body() body: any) {
    const { userId } = body;
    return this.authService.logout(userId);
  }

  @Get('/user/me')
  @UseGuards(AuthGuard)
  async getMe(@Req() req) {
    return this.authService.getSafeUserById(req.user.userId);
  }
}
