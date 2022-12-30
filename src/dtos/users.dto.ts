import { Roles } from '@/interfaces/users.interface';
import { ArrayContains, IsArray, IsDate, IsDateString, IsEmail, IsIn, IsMobilePhone, IsString, ValidationArguments } from 'class-validator';

export class CreateUserDto {
  @IsEmail({ message: () => 'email_must_be_an_email' })
  public email: string;

  @IsString()
  public password: string;

  @IsDateString({ message: () => 'birthdate_incorrect' })
  public birthDate: string;

  @IsString()
  public phoneNumber: string;

  @IsIn(['male', 'female'], { message: () => 'gender_incorrect' })
  public gender: string;

  @IsString({ message: (args: ValidationArguments) => `${args.targetName} must be a string` })
  public firstName: string;

  @IsString({ message: (args: ValidationArguments) => `${args.targetName} must be a string` })
  public lastName: string;

  @IsArray({ message: () => 'roles_must_be_array' })
  public roles: Roles;

  @IsString({ message: (args: ValidationArguments) => `${args.targetName} must be a string` })
  public livingCountry: string;
}

export class LoginDto {
  @IsEmail({ message: () => 'email_must_be_an_email' })
  public email: string;

  @IsString()
  public password: string;
}
