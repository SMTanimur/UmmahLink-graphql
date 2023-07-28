import { Injectable } from "@nestjs/common";
import {
    UploadApiOptions,
    v2 as cloudinary,
    UploadApiResponse,
} from "cloudinary";
import { UploadedImagesDto } from "./dto/upload-images.dto";
import { SingleUploadedImageDto } from "./dto/upload-image.dto";

@Injectable()
export class UploadService {
  
    async uploadImages(
        imageFiles: Express.Multer.File[],
    ): Promise<UploadedImagesDto> {
        const uploadPromises: Promise<UploadApiResponse>[] = [];

        for (let i = 0; i < imageFiles.length; i++) {
            const uploadPromise = this.upload(imageFiles[i].buffer, {
                transformation: [
                    {
                        width: 640,
                        height: 640,
                        crop: "pad",
                        fetch_format: "jpg",
                    },
                ],
                folder: "ummahlink",
            });
            uploadPromises.push(uploadPromise);
        }
        const cldImages = await Promise.all(uploadPromises);
        const resultImages = cldImages.map((img) => ({
            img_id: img.public_id,
            img_src: img.secure_url,
        }));
        return { images: resultImages };
    }

    async uploadSingleImage(
        imageFile: Express.Multer.File,
    ): Promise<SingleUploadedImageDto> {
        const result = await this.upload(imageFile.buffer, {
            transformation: [
                {
                    width: 640,
                    height: 640,
                    crop: "lfill",
                    fetch_format: "jpg",
                },
                {
                    fetch_format: "jpg",
                },
            ],
            folder: "ummahlink",
        });
        const image = { img_id: result.public_id, img_src: result.secure_url };
        return { image };
    }
    upload(
        fileBuffer: Buffer,
        options?: UploadApiOptions,
    ): Promise<UploadApiResponse> {
        return new Promise<UploadApiResponse>((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(options, (err, value) => {
                    if (err) reject(err.message);
                    resolve(value);
                })
                .end(fileBuffer);
        });
    }

    deleteOne(public_id: string): Promise<any> {
        return cloudinary.uploader.destroy(public_id);
    }

    deleteMany(public_ids: string[]): Promise<any> {
        return cloudinary.api.delete_resources(public_ids);
    }
}
