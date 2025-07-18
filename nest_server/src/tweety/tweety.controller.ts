import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTweetyDto } from './dto/create.dto';
import { TweetyService } from './tweety.service';
import mongoose from 'mongoose';
import { UpdateTweetyDto } from './dto/updateTweety.dto';
import { AuthGuard } from 'src/guards/auth.guards';
import { CreateCommentDto } from './dto/create.Comment.dto';

@UseGuards(AuthGuard)
@Controller('tweety')
export class TweetyController {
  userService: any;
  constructor(private readonly tweetyService: TweetyService) {}
  // Add your controller methods and properties here
  // For example, you can define routes and handle requests
  // using decorators like @Get(), @Post(), etc.
  @Post()
  @UsePipes(new ValidationPipe())
  async createTweet(@Body() createTweetDto: CreateTweetyDto) {
    // Handle the creation of a tweet here
    // You can use a service to interact with the database or perform other operations
    return this.tweetyService.createTweety(createTweetDto);
  }

  @Get()
  @UsePipes(new ValidationPipe())
  async getAllTweeties() {
    // Handle the retrieval of all tweets here
    // You can use a service to interact with the database or perform other operations
    return this.tweetyService.getAllTweeties();
  }
  @Get(':id')
  @UsePipes(new ValidationPipe())
  async getTweetyById(@Param('id') id: string) {
    // Handle the retrieval of a tweet by ID here
    // You can use a service to interact with the database or perform other operations
    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Invalid ID format', 400);
    } else {
      return this.tweetyService.getTweetyById(id);
    }
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  async deleteTweety(@Param('id') id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Invalid ID format', 400);
    } else {
      return this.tweetyService.deleteTweety(id);
    }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateTweety(
    @Param('id') id: string,
    @Body() updateTweetyDto: UpdateTweetyDto,
  ) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Invalid ID format', 400);
    } else {
      return this.tweetyService.updateTweety(id, updateTweetyDto);
    }
  }

  @Post(':id/comments')
  @UsePipes(new ValidationPipe())
  async addCommentToTweety(
    @Param('id') tweetyId: string,
    @Body() comment: CreateCommentDto,
  ) {
    if (!mongoose.Types.ObjectId.isValid(tweetyId)) {
      throw new HttpException('Invalid ID format', 400);
    } else {
      return this.tweetyService.addCommentToTweety(tweetyId, comment);
    }
  }

  @Delete(':id/comments/:commentId')
  @UsePipes(new ValidationPipe())
  async removeCommentFromTweety(
    @Param('id') tweetyId: string,
    @Param('commentId') commentId: string,
  ) {
    if (!mongoose.Types.ObjectId.isValid(tweetyId)) {
      throw new HttpException('Invalid ID format', 400);
    } else {
      return this.tweetyService.removeCommentFromTweety(tweetyId, commentId);
    }
  }
}
