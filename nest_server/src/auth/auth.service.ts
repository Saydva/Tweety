import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { RefreshToken } from './schema/refreshtoken.schema';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
@UsePipes(new ValidationPipe())
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(RefreshToken.name)
    private RefreshTokenModel: Model<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  async signup(signUpData: SignUpDto) {
    const { name, email, password } = signUpData;
    const emailExists = await this.UserModel.findOne({
      email: email,
    });
    if (emailExists) {
      throw new BadRequestException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
  }

  async login(loginData: LoginDto) {
    const { email, password } = loginData;
    const user = await this.UserModel.findOne({ email });

    if (!user) {
      throw new BadRequestException('Wrong credentials');
    }
    const name = user?.name;
    const _id = user?._id;

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new BadRequestException('Wrong credentials');
    }
    const tokens = await this._generateTokens((user._id as any).toString());
    return { name, _id, tokens };
  }

  async logout(userId: string) {
    await this.RefreshTokenModel.deleteOne({ userId });
    return { message: 'Logged out successfully' };
  }

  async refreshToken(refreshToken: string) {
    const token = await this.RefreshTokenModel.findOne({
      token: refreshToken,
      expiryDate: { $gte: new Date() },
    });
    if (!token) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return this._generateTokens(token.userId.toString());
  }

  async _generateTokens(userId: string) {
    const accessToken = this.jwtService.sign({ userId });
    const refreshToken = uuidv4();
    await this._storeRefreshToken(refreshToken, userId);
    return {
      accessToken,
      refreshToken,
    };
  }

  async _storeRefreshToken(token: string, userId: string) {
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 30);
    await this.RefreshTokenModel.updateOne(
      { userId },
      {
        $set: { expiryDate, token },
      },
      {
        upsert: true,
      },
    );
  }

  async getSafeUserById(id: string) {
    const user = await this.UserModel.findOne({ _id: id });
    if (!user) return null;
    const { password, ...safeUser } = user.toObject();
    return safeUser;
  }
}
