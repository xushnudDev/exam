import { ArgumentMetadata, BadRequestException, Injectable, NotAcceptableException, PipeTransform } from "@nestjs/common";

@Injectable()
export class CheckSizeImage implements PipeTransform {
    constructor(private readonly limit: number) {}

    transform(image: Express.Multer.File) {
        if(!image) {
            throw new BadRequestException("Image is required");
        }
        if(image.size > this.limit) {
            throw new NotAcceptableException("Image size is too large")
        };
        return image;
    }
}