import { ArgumentMetadata, BadRequestException, ConflictException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class CheckFileMimetype implements PipeTransform {
    constructor(private readonly allowedMimetypes: string[]) {}

    transform(image: Express.Multer.File) {
        if(!image) {
            throw new BadRequestException("Image is required")
        };

        if(!this.allowedMimetypes.includes(image.mimetype)) {
            throw new ConflictException("Image type is not allowed")
        };
        return image;
    }
}