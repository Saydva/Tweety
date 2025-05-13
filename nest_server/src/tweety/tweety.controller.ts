import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTweetyDto } from './dto/create.dto';
import { TweetyService } from './tweety.service';

@Controller('tweety')
export class TweetyController {
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
}
