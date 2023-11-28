import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
  ValidateNested,
  IsNumber,
  IsPositive,
} from 'class-validator';

class CityDto {
  @IsNotEmpty()
  cityId: number;
}

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  // @ValidateNested()
  // @Type(() => CityDto)
  // city: CityDto;
  @IsNumber()
  @IsPositive()
  cityId: number;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @IsDateString()
  @IsOptional()
  startDate: string;

  @IsDateString()
  @IsOptional()
  endDate: string;
}
