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
  controllers: [TweetyController], // You can add your controllers here if needed
  providers: [TweetyService], // You can add your services here if needed
  exports: [MongooseModule],
})
export class TweetyModule {}
// This module imports the MongooseModule and registers the Tweety schema with it.
// It also exports the MongooseModule so that it can be used in other modules.
// The MongooseModule is a NestJS module that provides integration with Mongoose,
