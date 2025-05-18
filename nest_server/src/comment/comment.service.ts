import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schema/comment.schema';
import { createCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('comment') private readonly CommentModel: Model<Comment>,
  ) {}
  async createComment(createCommentDto: createCommentDto) {
    const newComment = new this.CommentModel(createCommentDto);
    await newComment.save();
    return newComment;
  }

  async getAllComments() {
    const comments = await this.CommentModel.find();
    return comments;
  }
}
