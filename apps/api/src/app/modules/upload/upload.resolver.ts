import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UploadService } from './upload.service';
import { ResponseSingleUpload } from './dto/upload.dto';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Resolver()
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Mutation(() => ResponseSingleUpload)
  async uploadSingleFiles(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<any> {
    return this.uploadService.uploadSingleToCloudinaryGraphql(file);
  }

  @Mutation(() => [ResponseSingleUpload])
  async uploadMultipleFiles(
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: [FileUpload],
  ): Promise<any> {
    return this.uploadService.uploadMultipleToCloudinaryGraphql(files);
  }
}
