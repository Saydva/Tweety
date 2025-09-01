import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTweetyDto } from 'src/tweety/dto/CreateTweetyDto';
import { Tweety } from 'src/tweety/schema/tweety.schema';
import { User } from 'src/auth/schema/user.schema'; // uprav cestu podľa projektu;
@Injectable()
export class TweetyService {
  constructor(
    @InjectModel('Tweety') private readonly tweetyModel: Model<Tweety>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async createTweety(createTweetyDto: CreateTweetyDto) {
    const user = await this.userModel.findById(createTweetyDto.userId);
    if (!user) {
      throw new Error('User not found');
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

  async getTweetyById(id: string) {
    const tweety = await this.tweetyModel.findById(id);
    return tweety;
  }

  async deleteTweety(id: string) {
    const tweety = await this.tweetyModel.findByIdAndDelete(id);
    return tweety;
  }
}
