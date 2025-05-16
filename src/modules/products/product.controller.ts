import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { CreateProductDto, GetAllProductsDto } from './dtos';
import { FileInterceptor } from '@nestjs/platform-express';
import { CheckFileMimetype, CheckSizeImage } from './pipes';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({
    summary: 'Get all products',
  })
  @Get()
  async getAll(@Query() query: GetAllProductsDto) {
    return this.productService.getAll(query);
  }

  @ApiOperation({
    summary: 'Get product by id',
  })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getById({ id });
  }

  @ApiOperation({
    summary: 'Create product with image',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async createProduct(
    @Body() payload: CreateProductDto,
    @UploadedFile(
      new CheckFileMimetype([
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/gif',
      ]),
      new CheckSizeImage(3 * 1024 * 1024),
    )
    image: Express.Multer.File,
  ) {
    return this.productService.create(payload, image);
  }
  @ApiOperation({
    summary: 'Update product with image',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @Put(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateProductDto,
    @UploadedFile(
      new CheckFileMimetype([
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/gif',
      ]),
      new CheckSizeImage(3 * 1024 * 1024),
    )
    image: Express.Multer.File,
  ) {
    return this.productService.update(id, payload, image);
  }

  @ApiOperation({
    summary: 'Delete product by id',
  })
  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }
}
