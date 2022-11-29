import { IsEmail, IsString, ValidationArguments } from 'class-validator';

export class CreateUserDto {
  @IsEmail({ message: () => 'email_must_be_an_email' })
  public email: string;

  @IsString()
  public password: string;

  @IsString({ message: (args: ValidationArguments) => `${args.targetName} must be a string` })
  public firstName: string;

  @IsString({ message: (args: ValidationArguments) => `${args.targetName} must be a string` })
  public lastName: string;
}

export class LoginDto {
  @IsEmail({ message: () => 'email_must_be_an_email' })
  public email: string;

  @IsString()
  public password: string;
}
