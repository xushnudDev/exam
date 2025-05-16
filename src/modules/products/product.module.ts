import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ProductTableModel } from "./model";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { FsHelper } from "src/helpers";

@Module({
    imports: [
        SequelizeModule.forFeature([ProductTableModel])
    ],
    controllers: [ProductController],
    providers: [ProductService,FsHelper],
})
export class ProductModule {}