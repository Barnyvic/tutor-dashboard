import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class StudentProgressDto {
  @IsNotEmpty()
  @IsNumber()
  grade: number;

  @IsNotEmpty()
  @IsString()
  performanceMetrics: string;

  @IsNotEmpty()
  @IsString()
  feedback: string;
}
