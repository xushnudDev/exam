import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer'; // <-- MUHIM
import { Status } from '../enum';

export class CreateProductDto {
  @ApiProperty({ type: 'string', example: 'Product Name' })
  @IsString()
  name: string;

  @ApiProperty({ type: 'string', example: 'Product Description' })
  @IsString()
  description: string;

  @ApiProperty({ type: 'number', example: 100.0 })
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty({ type: 'number', example: 10 })
  @Type(() => Number)
  @IsNumber()
  discount: number;

  @ApiProperty({ type: 'number', example: 5 })
  @Type(() => Number)
  @IsNumber()
  rating: number;

  @ApiProperty({ type: 'number', example: 10 })
  @Type(() => Number)
  @IsNumber()
  quantity: number;

  @ApiProperty({ enum: Status, example: Status.ACTIVE })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    example: 'image.jpg',
  })
  image?: Express.Multer.File;
}
