import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthRefreshService } from './auth-refresh.service';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('auth-refresh')
export class AuthRefreshController {
  constructor(private readonly authRefreshService: AuthRefreshService) {}

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh Authentication Token' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({ status: 201, description: 'Token refreshed successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid refresh token.' })
  @UsePipes(new ValidationPipe())
  async refreshToken(@Body() body: RefreshTokenDto) {
    const { refreshToken } = body;
    return this.authRefreshService.refreshToken(refreshToken);
  }
}
