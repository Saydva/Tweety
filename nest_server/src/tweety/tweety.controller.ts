import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTweetyDto } from './dto/CreateTweetyDto';
import { TweetyService } from './tweety.service';
import { AuthGuard } from 'src/_guards/authGuard';

@Controller('tweety')
export class TweetyController {
  constructor(private readonly tweetyService: TweetyService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createTweet(@Body() createTweetDto: CreateTweetyDto) {
    return this.tweetyService.createTweety(createTweetDto);
  }

  @Get()
  @UsePipes(new ValidationPipe())
  async getAllTweeties() {
    return this.tweetyService.getAllTweeties();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async getTweetyById(@Param('id') id: string) {}

  @Delete(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async deleteTweety(@Param('id') id: string) {
    return this.tweetyService.deleteTweety(id);
  }
}
