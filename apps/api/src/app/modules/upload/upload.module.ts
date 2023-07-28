import { UploadController } from './upload.controller';
import { Module } from '@nestjs/common';
import { memoryStorage } from 'multer';
import { UploadService } from './upload.service';
import { MulterModule } from '@nestjs/platform-express';

import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(), 
      // use memory storage for having the buffer
    }),
  ],
  controllers: [UploadController, UploadController],
  providers: [CloudinaryProvider, UploadService],
  exports: [CloudinaryProvider,UploadService],
})
export class UploadModule {}
