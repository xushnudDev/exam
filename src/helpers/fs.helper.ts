import { Injectable, NotFoundException } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class FsHelper {
    async uploadImage(image: Express.Multer.File) {
        const imageFolder = path.join(process.cwd(),"uploads");

        if(!fs.existsSync(imageFolder)) {
            fs.mkdirSync(imageFolder,{recursive: true});
        };

        let imageName = `${Date.now()}-image.${image.originalname.split(".")[1]}`;
        fs.writeFileSync(path.join(imageFolder,imageName),image.buffer);

        return {
            message: "Image uploaded successfully",
            imageName: path.join(imageFolder,imageName)
        }
    };
    async deleteImage(imageName: string) {
        const imageFolder = path.join(process.cwd(),"uploads",imageName);

        try {
            if(fs.existsSync(imageFolder)) {
                fs.unlinkSync(imageFolder);
                console.log("Image deleted successfully");
            } else {
                console.log("Image not found");
                throw new NotFoundException("Image not found");
            }
        } catch (error) {
            throw new Error("Failed to delete image");
        }
    }
}