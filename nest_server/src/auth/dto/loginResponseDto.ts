import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user';

export class LoginResponseDto {
  @ApiProperty({ type: UserDto })
  user: UserDto;

  @ApiProperty({ example: 'accessToken', description: 'Acces Token' })
  accessToken: string;

  @ApiProperty({ example: 'refreshToken', description: 'Refresh token' })
  refreshToken: string;
}
