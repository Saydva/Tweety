import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tweety, TweetySchema } from './schema/tweety.schema';
import { User, UserSchema } from 'src/auth/schema/user.schema';
import { TweetyService } from './tweety.service';
import { TweetyController } from './tweety.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tweety.name, schema: TweetySchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [TweetyController],
  providers: [TweetyService],
  exports: [MongooseModule],
})
export class TweetyModule {}
