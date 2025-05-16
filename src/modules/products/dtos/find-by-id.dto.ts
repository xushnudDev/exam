import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt } from "class-validator";

export class FindByIdDto {
    @Transform(({ value }) => parseInt(value))
    @ApiProperty({
        type: 'number',
        required: true,
        example: 1
    })
  @IsInt()
  id: number;
}