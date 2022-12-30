import { IsBoolean, IsString, ValidationArguments } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  public teacher: string;

  @IsString()
  public student: string;

  @IsString()
  public dateTime: string;

  @IsBoolean()
  public paid: string;
}
