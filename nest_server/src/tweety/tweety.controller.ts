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
import { CreateTweetyDto } from './dto/createTweetyDto';
import { TweetyResponseDto } from './dto/tweetyResponse.dto';
import { TweetyService } from './tweety.service';
import { AuthGuard } from 'src/_guards/authGuard';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('tweety')
export class TweetyController {
  constructor(private readonly tweetyService: TweetyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tweety' })
  @ApiBody({ type: CreateTweetyDto })
  @ApiResponse({ status: 201, description: 'Tweety created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createTweet(@Body() createTweetDto: CreateTweetyDto) {
    return this.tweetyService.createTweety(createTweetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tweeties' })
  @ApiResponse({
    status: 200,
    description: 'List of all tweeties.',
    type: [TweetyResponseDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async getAllTweeties() {
    return this.tweetyService.getAllTweeties();
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true, description: 'Tweety ID' })
  @ApiResponse({ status: 200, description: 'Tweety deleted successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Tweety not found.' })
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async deleteTweety(@Param('id') id: string) {
    return this.tweetyService.deleteTweety(id);
  }
}
