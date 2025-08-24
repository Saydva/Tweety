import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTweetyDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsOptional()
  @IsString({ each: true })
  comments: object[];

  @IsOptional()
  @IsNumber()
  likes: number;

  @IsString()
  owner: string;

  @IsBoolean()
  myLike: boolean;
}
