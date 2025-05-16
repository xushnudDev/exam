import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";

export class DeleteProductDto {
    @Transform(({ value }) => Number(value))
    @ApiProperty({
        type: 'number',
        required: true,
        example: 1,
    })
    @IsNumber()
    id: number;
}