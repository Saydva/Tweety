import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateTweetyDto } from './dto/createTweetyDto';
import { Tweety } from 'src/tweety/schema/tweety.schema';
import { User } from 'src/auth/schema/user.schema';
import { TweetyResponseDto } from './dto/tweetyResponse.dto';
@Injectable()
export class TweetyService {
  constructor(
    @InjectModel('Tweety') private readonly tweetyModel: Model<Tweety>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async createTweety(
    createTweetyDto: CreateTweetyDto,
  ): Promise<TweetyResponseDto> {
    const user = await this.userModel.findById(createTweetyDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const newTweety = new this.tweetyModel({
      content: createTweetyDto.content,
      owner: user.name,
    });
    await newTweety.save();
    return {
      id: newTweety.id.toString(),
      content: newTweety.content,
      owner: newTweety.owner,
    };
  }

  async getAllTweeties(): Promise<TweetyResponseDto[]> {
    const response = await this.tweetyModel.find();
    return response.map((t) => ({
      id: t.id.toString(),
      content: t.content,
      owner: t.owner,
    }));
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
