import {
  Injectable,
  BadRequestException,
  UsePipes,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './schema/user.schema';
import { SignUpDto } from './dto/signupDto';
import { LoginDto } from './dto/loginDto';
import { RefreshToken } from 'src/auth-refresh/schema/refreshtoken.schema';
import { LoginResponseDto } from './dto/loginResponseDto';

@Injectable()
@UsePipes(new ValidationPipe())
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel('RefreshToken') private RefreshTokenModel: Model<RefreshToken>,
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

  async login(loginData: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginData;
    const user = await this.UserModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const name = user.name;
    const _id = user._id as string;
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new BadRequestException('Wrong password');
    }
    const tokens = await this._generateTokens(_id);
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 30);
    await this.RefreshTokenModel.updateOne(
      { userId: _id },
      { $set: { expiryDate, token: tokens.refreshToken } },
      { upsert: true },
    );
    return {
      user: { name, email, _id },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async logout(userId: string) {
    await this.RefreshTokenModel.deleteOne({ userId });
    return { message: 'Logged out successfully' };
  }

  async _generateTokens(userId: string) {
    const accessToken = this.jwtService.sign({ userId });
    const refreshToken = this.jwtService.sign({ userId }, { expiresIn: '30m' });
    return {
      accessToken,
      refreshToken,
    };
  }
}
