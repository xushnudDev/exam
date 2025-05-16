import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, isNumber, IsNumber, IsString } from "class-validator";
import { Status } from "../enum";

export class CreateProductDto {
    @ApiProperty({
        type: 'string',
        required: true,
        example: 'Product Name',
    })
    @IsString()
    name: string;

    @ApiProperty({
        type: 'string',
        required: true,
        example: 'Product Description',
    })
    @IsString()
    description: string

    @ApiProperty({
        type: 'number',
        required: true,
        example: 100.00,
    })
    @IsNumber()
    price: number

    @ApiProperty({
        type: 'number',
        required: true,
        example: 10,
    })
    @IsNumber()
    discount: number

    @ApiProperty({
        type: 'number',
        required: true,
        example: 5,
    })
    @IsNumber()
    rating: number

    @ApiProperty({
        type: 'number',
        required: true,
        example: 10,
    })
    @IsNumber()
    quantity: number

    @ApiProperty({
        type: 'string',
        required: true,
        enum: Status,
        default: Status.ACTIVE,
        example: 'active',
    })
    @IsString()
    @IsEnum(Status)
    status: Status

    image: Express.Multer.File | null;
}