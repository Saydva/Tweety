import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTweetyDto } from 'src/tweety/dto/create.dto';
import { Tweety } from 'src/tweety/schema/tweety.schema';
import { UpdateTweetyDto } from './dto/updateTweety.dto';

@Injectable()
export class TweetyService {
  constructor(
    @InjectModel('Tweety') private readonly tweetyModel: Model<Tweety>,
  ) {}
  @UsePipes(new ValidationPipe())
  async createTweety(createTweetyDto: CreateTweetyDto) {
    const newTweety = new this.tweetyModel(createTweetyDto);
    await newTweety.save();
    return newTweety;
  }
  @UsePipes(new ValidationPipe())
  async getAllTweeties() {
    return await this.tweetyModel.find();
  }
  @UsePipes(new ValidationPipe())
  async getTweetyById(id: string) {
    const tweety = await this.tweetyModel.findById(id);
    return tweety;
  }
  @UsePipes(new ValidationPipe())
  async deleteTweety(id: string) {
    const tweety = await this.tweetyModel.findByIdAndDelete(id);
    return tweety;
  }
  @UsePipes(new ValidationPipe())
  async updateTweety(id: string, updateTweetyDto: UpdateTweetyDto) {
    const tweety = await this.tweetyModel.findByIdAndUpdate(
      id,
      updateTweetyDto,
      { new: true },
    );
    if (!tweety) {
      throw new Error('Tweety not found');
    }
    return tweety;
  }
}
