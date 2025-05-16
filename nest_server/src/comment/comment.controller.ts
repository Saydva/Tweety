import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { createCommentDto } from './dto/comment.dto';

@Controller('comment')
export class CommmentController {
  constructor(private readonly CommentService: CommentService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createSubTweety(@Body() createCommentDto: createCommentDto) {
    return this.CommentService.createSubTweety(createCommentDto);
  }
}
