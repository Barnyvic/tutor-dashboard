import { IsNotEmpty, IsDateString, IsString } from 'class-validator';

export class TutoringSessionDto {
  @IsNotEmpty()
  @IsString()
  studentName: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsString()
  subject: string;
}
