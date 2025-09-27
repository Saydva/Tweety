import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user';
import { IsObject, IsString } from 'class-validator';

export class LoginResponseDto {
  @ApiProperty({ type: UserDto })
  @IsObject()
  user: UserDto;

  @ApiProperty({ example: 'accessToken', description: 'Acces Token' })
  @IsString()
  accessToken: string;

  @ApiProperty({ example: 'refreshToken', description: 'Refresh token' })
  @IsString()
  refreshToken: string;
}
