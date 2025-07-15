import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTweetyDto } from 'src/tweety/dto/create.dto';
import { Tweety } from 'src/tweety/schema/tweety.schema';
import { UpdateTweetyDto } from './dto/updateTweety.dto';
import { CreateCommentDto } from './dto/create.Comment.dto';

@Injectable()
export class TweetyService {
  constructor(
    @InjectModel('Tweety') private readonly tweetyModel: Model<Tweety>,
  ) {}
  async createTweety(createTweetyDto: CreateTweetyDto) {
    const newTweety = new this.tweetyModel(createTweetyDto);
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

  async addCommentToTweety(tweetyId: string, comment: CreateCommentDto) {
    const tweety = await this.tweetyModel.findByIdAndUpdate(
      tweetyId,
      { $push: { comments: comment } },
      { new: true },
    );
    if (!tweety) {
      throw new Error('Tweety not found');
    }
    return tweety;
  }

  async removeCommentFromTweety(tweetyId: string, commentId: string) {
    const tweety = await this.tweetyModel.findByIdAndUpdate(
      tweetyId,
      { $pull: { comments: { _id: commentId } } },
      { new: true },
    );
    if (!tweety) {
      throw new Error('Tweety not found');
    }
    return tweety;
  }
}
