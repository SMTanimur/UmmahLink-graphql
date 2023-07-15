import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import toStream = require('buffer-to-stream');
import { v2 } from 'cloudinary';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class UploadService {
  /**
   *
   * @param args upload with GRAPHQL
   * @returns
   */
  // upload single to cloudinary with graphql
  async uploadSingleToCloudinaryGraphql(file: FileUpload): Promise<any> {
    try {
      const { createReadStream } = await file;
      const buffer = await this.streamToBuffer(createReadStream());
      // const data = this.cloudinary(buffer);
      console.log(buffer);
      return 'dfjkdj';
      // return data
    } catch (error) {
      return error;
    }
  }

  // upload multiple to cloudinary with graphql
  async uploadMultipleToCloudinaryGraphql(files: [FileUpload]): Promise<any> {
    try {
      const arrayResponse: any[] = [];
      await Promise.all(
        files.map(async (file: FileUpload) => {
          const result = await this.uploadSingleToCloudinaryGraphql(file);
          arrayResponse.push(result);
        })
      );
      return arrayResponse;
    } catch (error) {
      return error;
    }
  }

  async streamToBuffer(stream: Readable): Promise<Buffer> {
    const buffer: Uint8Array[] = [];

    return new Promise((resolve, reject) =>
      stream
        .on('error', (error) => reject(error))
        .on('data', (data) => buffer.push(data))
        .on('end', () => resolve(Buffer.concat(buffer)))
    );
  }

  async cloudinary(buffer: any, folder = ''): Promise<any> {
    return await new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: 'ummahlink/' + folder },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      toStream(buffer).pipe(upload);
    });
  }
}
