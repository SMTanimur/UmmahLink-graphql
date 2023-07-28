/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadedImagesDto } from './dto/upload-images.dto';
import { UploadService } from './upload.service';
import { SingleUploadedImageDto } from './dto/upload-image.dto';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post("images")
    @UseInterceptors(FilesInterceptor("files", 5))
    uploadImages(
        @UploadedFiles(
            new ParseFilePipe({
                validators: [new MaxFileSizeValidator({ maxSize: 5242880 })],
            }),
        )
        files: Express.Multer.File[],
    ): Promise<UploadedImagesDto> {
        return this.uploadService.uploadImages(files);
    }

    @Post("image")
    @UseInterceptors(FileInterceptor("files"))
   async uploadSingeImage(
        @UploadedFile(
            new ParseFilePipe({
                validators: [new MaxFileSizeValidator({ maxSize: 5242880 })],
            }),
        )
        file: Express.Multer.File,
    ): Promise<SingleUploadedImageDto> {
        return await this.uploadService.uploadSingleImage(file);
    }

    @Get('example')
    example() {
        return 'Hello World!';
    }
}
