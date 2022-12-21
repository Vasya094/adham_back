import { IsBoolean, IsString, ValidationArguments } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  public teacher: string;

  @IsString()
  public student: string;

  @IsString()
  public date: string;

  @IsString()
  public time: string;

  @IsBoolean()
  public paid: string;
}
