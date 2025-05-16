import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { UserRoles } from "../enum";

export class CreateUserDto {
    @ApiProperty({
        type: 'string',
        required: true,
        example: 'Tom'
    })
    @IsString()
    fullname: string;

    @ApiProperty({
        type: 'string',
        required: true,
        example: 'tom@gmail.com'
    })
    @IsString()
    email: string;

    @ApiProperty({
        type: 'string',
        required: true,
        example: '123456'
    })
    @IsString()
    password: string;

    @ApiProperty({
        type: 'number',
        required: true,
        example: 18
    })
    @IsString()
    age: number;

    @ApiProperty({
        type: 'string',
        required: true,
        example: 'male'
    })
    @IsString()
    gender: string;

    @ApiProperty({
        type: 'string',
        enum: UserRoles,
        default: UserRoles.USER,
        required: false,
    })
    @IsOptional()
    @IsEnum(UserRoles)
    role: UserRoles;

   
}