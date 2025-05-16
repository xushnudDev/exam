import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductTableModel } from './model';
import { CreateProductDto, FindByIdDto, GetAllProductsDto, UpdateProductDto } from './dtos';
import { Op } from 'sequelize';
import { FsHelper } from 'src/helpers';

@Injectable()
export class ProductService implements OnModuleInit {
  constructor(
    @InjectModel(ProductTableModel)
    private readonly productModel: typeof ProductTableModel,
    private readonly fsHelper: FsHelper
  ) {}

  async onModuleInit() {
    await this.#_seedProducts();
  }
  async getAll(query: GetAllProductsDto) {
    const filters: any = {};

    if (query.minPrice !== undefined) {
      filters.price = { [Op.gte]: query.minPrice };
    }
    if (query.maxPrice !== undefined) {
      filters.price = { ...filters.price, [Op.lte]: query.maxPrice };
    }

    if (query.minDiscount) {
      filters.discount = { [Op.gte]: query.minDiscount };
    }
    if (query.maxDiscount) {
      filters.discount = { ...filters.discount, [Op.lte]: query.maxDiscount };
    }
    if (query.minRating) {
      filters.rating = { [Op.gte]: query.minRating };
    }
    if (query.maxRating) {
      filters.rating = { ...filters.rating, [Op.lte]: query.maxRating };
    }

    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const { count, rows: products } = await this.productModel.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      order: query.sortField
        ? [[query.sortField, query.sortOrder ?? 'ASC']]
        : undefined,
      where: filters,
      attributes: query.fields  
    });
    return {
        count,
        page,
        limit,
        data: products
    }
  };

  async getById(payload: FindByIdDto) {
    const product = await this.productModel.findByPk(payload.id);
    if(!product) {
        throw new Error('Product not found');
    }
    return {
        message: 'Product found',
        data: product
    }
  };

  async create(payload: CreateProductDto,image: Express.Multer.File) {
    if (!image) {
        throw new NotFoundException('Image not found');
    };

    if(image) {
        const imageName = await this.fsHelper.uploadImage(image);
        const imageUrl = imageName.imageName.split('/').pop();

        const product = await this.productModel.create({
            ...payload,
            image: imageUrl
        });
        return {
            message: 'Product created',
            data: product
        }
    } else {
        throw new NotFoundException('Image not found');
    }
  };

  async update(id: number, payload: UpdateProductDto,image: Express.Multer.File) {
    const product = await this.productModel.findByPk(id);
    if(!product) {
        throw new NotFoundException('Product not found');
    }
    if(image) {
        await this.fsHelper.deleteImage(product.dataValues.image);
        const imageName = await this.fsHelper.uploadImage(image);
        const imageUrl = imageName.imageName.split('/').pop();

        await product.update({
            ...payload,
            image: imageUrl
        })
    } else if (payload) {
        await product.update(payload);
    }
    return {
        message: 'Product updated',
        data: product
    }
  };
  async delete(id:number) {
    const product = await this.productModel.findByPk(id);
    if(!product) {
        throw new NotFoundException('Product not found');
    }
    await this.fsHelper.deleteImage(product.dataValues.image);
    await product.destroy();
    return {
        message: 'Product deleted'
    }
  }

  async #_seedProducts() {
    const products = [
        {
            name: 'Phone',
            description: 'the best phone ever',
            price: 100,
            discount: 10,
            rating: 4.5,
            image: null,
        },
        {
            name: 'fridge',
            description: 'the best fridge ever',
            price: 200,
            discount: 20,
            rating: 4.5,
            image: null,
        },
        {
            name: 'Laptop',
            description: 'the best laptop ever',
            price: 300,
            discount: 30,
            rating: 4.5,
            image: null,
        },
        {
            name: 'TV',
            description: 'the best TV ever',
            price: 400,
            discount: 40,
            rating: 4.5,
            image: null,
        },
        {
            name: 'Tablet',
            description: 'the best tablet ever',
            price: 500,
            discount: 50,
            rating: 4.5,
            image: null,
        },
        {
            name: 'Headphones',
            description: 'the best headphones ever',
            price: 600,
            discount: 60,
            rating: 4.5,
            image: null,
        },
        {
            name: 'Smartwatch',
            description: 'the best smartwatch ever',
            price: 700,
            discount: 70,
            rating: 4.5,
            image: null,
        },
        {
            name: 'Camera',
            description: 'the best camera ever',
            price: 800,
            discount: 80,
            rating: 4.5,
            image: null,
        },
        {
            name: 'Gaming PC',
            description: 'the best gaming PC ever',
            price: 90,
            discount: 90,
            rating: 4.5,
            image: null,
        },
        {
            name: 'Smartphone',
            description: 'the best smartphone ever',
            price: 1000,
            discount: 100,
            rating: 4.5,
            image: null,
        }
    ]
  }
}
