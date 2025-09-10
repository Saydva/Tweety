import { Module } from '@nestjs/common';
import { AuthRefreshService } from './auth-refresh.service';
import { AuthRefreshController } from './auth-refresh.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshTokenSchema } from './schema/refreshtoken.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RefreshToken', schema: RefreshTokenSchema },
    ]),
  ],
  controllers: [AuthRefreshController],
  providers: [AuthRefreshService],
})
export class AuthRefreshModule {}
