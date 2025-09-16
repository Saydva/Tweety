import {
  Injectable,
  BadRequestException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RefreshToken } from 'src/auth-refresh/schema/refreshtoken.schema';

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

  async login(loginData: LoginDto) {
    const { email, password } = loginData;
    const user = (await this.UserModel.findOne({ email })) as User & {
      _id: string;
    };

    if (!user) {
      throw new BadRequestException('User not found');
    }
    const name = user?.name;
    const _id = user?._id;

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new BadRequestException('Wrong password');
    }
    const tokens = await this._generateTokens(user._id.toString());

    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 30);
    await this.RefreshTokenModel.updateOne(
      { userId: _id },
      { $set: { expiryDate, token: tokens.refreshToken } },
      { upsert: true },
    );
    return { name, _id, tokens };
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

  async getSafeUserById(id: string) {
    const user = await this.UserModel.findOne({ _id: id });
    if (!user) return null;
    const { password, ...safeUser } = user.toObject();
    return safeUser;
  }
}
