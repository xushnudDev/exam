import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Status } from "../enum";

export class UpdateProductDto {
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
    price: number

    @ApiProperty({
        type: 'number',
        required: true,
        example: 10,
    })
    discount: number

    @ApiProperty({
        type: 'number',
        required: true,
        example: 5,
    })
    rating: number

    @ApiProperty({
        type: 'number',
        required: true,
        example: 10,
    })
    quantity: number
    
    @ApiProperty({
        type: 'string',
        enum: Status,
        required: true,
        example: Status.ACTIVE
    })
    status: Status
}
 
