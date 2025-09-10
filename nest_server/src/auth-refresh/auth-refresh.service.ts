import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { RefreshToken } from 'src/auth-refresh/schema/refreshtoken.schema';

@Injectable()
export class AuthRefreshService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('RefreshToken') private RefreshTokenModel: Model<RefreshToken>,
  ) {}

  async refreshToken(refreshToken: string) {
    if (!refreshToken || typeof refreshToken !== 'string') {
      throw new BadRequestException('Refresh token is required');
    }

    const stored = await this.RefreshTokenModel.findOne({
      token: refreshToken,
    });
    if (!stored || stored.expiryDate < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const tokens = this._generateTokens(stored.userId.toString());
    await this._storeRefreshToken(
      tokens.refreshToken,
      stored.userId.toString(),
    );
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
  private _generateTokens(userId: string) {
    const accessToken = this.jwtService.sign({ userId });
    const refreshToken = this.jwtService.sign({ userId }, { expiresIn: '30m' });
    return { accessToken, refreshToken };
  }

  private async _storeRefreshToken(token: string, userId: string) {
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 30);
    await this.RefreshTokenModel.updateOne(
      { userId },
      { $set: { expiryDate, token } },
      { upsert: true },
    );
  }
}
