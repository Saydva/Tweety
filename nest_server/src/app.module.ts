import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TweetyModule } from './tweety/tweety.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthRefreshModule } from './auth-refresh/auth-refresh.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: process.env.secret || undefined,
        signOptions: {
          expiresIn: '1h',
        },
      }),
    }),
    MongooseModule.forRoot(
      process.env.MONGO_URI ?? 'mongodb://localhost:27017/tweety',
    ),
    TweetyModule,
    AuthModule,
    AuthRefreshModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
