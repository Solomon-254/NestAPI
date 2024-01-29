import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator"
import { IsAdult } from "../interceptor/user.interceptor";

export enum UserRole {
    Admin = 'admin',
    Normal = 'normal',
  }
  
  export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    regNumber: string;
  
    @IsString()
    firstName: string;
  
    @IsString()
    lastName: string;
  
    @IsEmail()
    emailAddress: string;

    @IsNotEmpty()
    @IsPhoneNumber('KE')
    phoneNumber: string;
  
    @IsString()
    @IsNotEmpty()
    role: UserRole;
  }
  