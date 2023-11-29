import { IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateRsvpDto {
  @IsBoolean()
  @IsNotEmpty()
  attending: boolean;
}
