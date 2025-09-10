import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthRefreshService } from './auth-refresh.service';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller('auth-refresh')
export class AuthRefreshController {
  constructor(private readonly authRefreshService: AuthRefreshService) {}

  @Post('refresh')
  @UsePipes(new ValidationPipe())
  async refreshToken(@Body() body: RefreshTokenDto) {
    const { refreshToken } = body;
    return this.authRefreshService.refreshToken(refreshToken);
  }
}
