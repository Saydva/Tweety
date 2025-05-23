import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TweetyModule } from './tweety/tweety.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI ?? 'mongodb://localhost:27017/tweety',
    ),
    ConfigModule.forRoot(),
    TweetyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
