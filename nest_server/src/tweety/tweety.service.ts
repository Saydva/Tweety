import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { get, Model } from 'mongoose';
import { CreateTweetyDto } from 'src/tweety/dto/create.dto';
import { Tweety } from 'src/tweety/schema/tweety.schema';

@Injectable()
export class TweetyService {
  constructor(
    @InjectModel('Tweety') private readonly tweetyModel: Model<Tweety>,
  ) {}
  async createTweety(createTweetyDto: CreateTweetyDto) {
    const newTweety = new this.tweetyModel(createTweetyDto);
    await newTweety.save();
  }
  getAllTweeties() {
    return this.tweetyModel.find();
  }

  // Add your service methods and properties here
}
