import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Info, InfoSchema } from './entities/info';
import { InfoService } from './Info.service';

@Module({
  imports: [ MongooseModule.forFeature([{ name: Info.name, schema: InfoSchema }]),],
  providers: [InfoService],
  exports: [InfoService],
})
export class InfoModule {}
