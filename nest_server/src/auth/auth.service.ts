import {
  Injectable,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { RefreshToken } from './schema/refresh-token.schema';
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
    //Todo: Check if email already exists
    const emailExists = await this.UserModel.findOne({
      email: email,
    });
    if (emailExists) {
      throw new UnauthorizedException('Email already exists');
    }
    //Todo: Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //Todo:Crate and save user to database
    await this.UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
  }
  async login(loginData: LoginDto) {
    const { email, password } = loginData;
    //todo: Check if user exists
    const user = await this.UserModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }
    const name = user?.name;
    //todo: Compare passwords with existing password

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }
    //todo: generate JWT tokens
    const tokens = await this.generateTokens((user._id as any).toString());
    return { name, tokens };
  }

  async refreshToken(refreshToken: string) {
    const token = await this.RefreshTokenModel.findOne({
      token: refreshToken,
      expiryDate: { $gte: new Date() },
    });
    if (!token) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return this.generateTokens(token.userId.toString());
  }

  async generateTokens(userId: string) {
    const accessToken = this.jwtService.sign({ userId });
    const refreshToken = uuidv4();
    await this.storeRefreshToken(refreshToken, userId);
    return {
      accessToken,
      refreshToken,
    };
  }
  async storeRefreshToken(token: string, userId: string) {
    // Store the refresh token in the database
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // Set expiration date to 7 days from now
    await this.RefreshTokenModel.updateOne(
      { userId },
      {
        $set: { expiryDate, token },
      },
      {
        upsert: true, // Create a new document if it doesn't exist
      },
    );
  }
  async findUser() {
    // Find user by ID
    return this.UserModel.find({});
  }
}
