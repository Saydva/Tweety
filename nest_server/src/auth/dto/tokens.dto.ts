import { ApiProperty } from '@nestjs/swagger';

export class TokensDto {
  @ApiProperty({ example: 'access-token-string', description: 'Access token' })
  accessToken: string;

  @ApiProperty({
    example: 'refresh-token-string',
    description: 'Refresh token',
  })
  refreshToken: string;
}
