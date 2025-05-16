import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    type: 'string',
    required: true,
    example: 'Tom',
  })
  @IsString()
  fullname: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: 'tom@gmail.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: '123456',
  })
  @MinLength(8)
  @IsString()
  password: string;
  
}
