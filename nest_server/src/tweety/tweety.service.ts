import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateTweetyDto } from 'src/tweety/dto/CreateTweetyDto';
import { Tweety } from 'src/tweety/schema/tweety.schema';
import { User } from 'src/auth/schema/user.schema';
@Injectable()
export class TweetyService {
  constructor(
    @InjectModel('Tweety') private readonly tweetyModel: Model<Tweety>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async createTweety(createTweetyDto: CreateTweetyDto) {
    const user = await this.userModel.findById(createTweetyDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const newTweety = new this.tweetyModel({
      content: createTweetyDto.content,
      owner: user.name,
    });
    await newTweety.save();
    return newTweety;
  }

  async getAllTweeties() {
    return await this.tweetyModel.find();
  }

  async deleteTweety(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const tweety = await this.tweetyModel.findByIdAndDelete(id);
    if (!tweety) {
      throw new NotFoundException('Tweety not found');
    }
    return tweety;
  }
}
