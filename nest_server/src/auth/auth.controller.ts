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
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from 'src/_guards/authGuard';
import { AuthService } from './auth.service';

import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'User registration' })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async signUp(@Body() SignUpData: SignUpDto) {
    return this.authService.signup(SignUpData);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'User Login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in.',
    type: LoginResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async login(@Body() loginData: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginData);
  }

  @Post('logout')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'User Logout' })
  @ApiBody({ schema: { example: { userId: 'string' } } })
  @ApiResponse({ status: 200, description: 'User successfully logged out.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async logout(@Body() body: { userId: string }) {
    const { userId } = body;
    return this.authService.logout(userId);
  }
}
