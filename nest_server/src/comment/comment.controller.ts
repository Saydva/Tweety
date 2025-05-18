import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { createCommentDto } from './dto/comment.dto';

@Controller('comment')
export class CommmentController {
  constructor(private readonly CommentService: CommentService) {}

  @Get()
  @UsePipes(new ValidationPipe())
  async getAllComments() {
    return this.CommentService.getAllComments();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createComment(@Body() createCommentDto: createCommentDto) {
    return this.CommentService.createComment(createCommentDto);
  }
}
