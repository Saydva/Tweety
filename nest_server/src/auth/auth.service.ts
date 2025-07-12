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
  // This function signs up a new user
  // It checks if the email already exists, hashes the password, and saves the user to
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
  // This function logs in a user
  // It checks if the user exists by email, compares the password,
  async login(loginData: LoginDto) {
    const { email, password } = loginData;
    //todo: Check if user exists
    const user = await this.UserModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }
    const name = user?.name;
    const _id = user?._id;
    //todo: Compare passwords with existing password

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }
    //todo: generate JWT tokens
    const tokens = await this.generateTokens((user._id as any).toString());
    return { name, _id, tokens };
  }
  // This function refreshes the access token using the refresh token
  // It checks if the refresh token is valid and not expired
  // if valid, it generates a new access token
  // If the refresh token is invalid or expired, it throws an UnauthorizedException
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
  // This function stores the refresh token in the database
  // It will create a new refresh token if it doesn't exist for the user, or update
  async storeRefreshToken(token: string, userId: string) {
    // Store the refresh token in the database
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 10);
    // Set the expiry date to 100 minutes from now
    // If the user already has a refresh token, update it; otherwise, create a new one
    // This will ensure that the refresh token is unique per user
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
