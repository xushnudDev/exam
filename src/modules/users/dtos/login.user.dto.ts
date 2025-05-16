import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    type: 'string',
    required: true,
    example: 'tursunboyevxushnudbek@gmail.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: 'xushnud1982',
  })
  @MinLength(8)
  @IsString()
  password: string;
}
