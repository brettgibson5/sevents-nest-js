import { IsNotEmpty, IsBoolean, IsNumber, IsPositive } from 'class-validator';

export class EditRsvpDto {
  @IsBoolean()
  @IsNotEmpty()
  attending: boolean;

  @IsNumber()
  @IsPositive()
  eventId: number;

  @IsNumber()
  @IsPositive()
  userId: number;
}
