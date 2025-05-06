import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTweetyDto } from 'src/dto/create.dto';
import { Tweety } from 'src/schemas/tweety.schema';

@Injectable()
export class TweetyService {
  constructor(
    @InjectModel('Tweety') private readonly tweetyModel: Model<Tweety>,
  ) {}
  createTweety(createTweetyDto: CreateTweetyDto) {
    const newTweety = new this.tweetyModel(createTweetyDto);
    return newTweety.save();
  }
  // Add your service methods and properties here
}
