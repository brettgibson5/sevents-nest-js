import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
