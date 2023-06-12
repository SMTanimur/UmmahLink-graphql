import { Injectable } from '@nestjs/common';
import { CreateOrUpdateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { InjectModel } from '@nestjs/mongoose';
import { Info, InfoDocument } from './entities/info';
import { Model } from 'mongoose';


@Injectable()
export class InfoService {
  constructor(
    @InjectModel(Info.name) private infoModel: Model<InfoDocument>
  ) {}

  async create(createProfileInput: CreateOrUpdateProfileInput) {
    const profile = await this.infoModel.create(createProfileInput);
    return profile;
    
  }

  async update(id: string, updateProfileInput: UpdateProfileInput) {
    await this.infoModel.updateOne({_id:id},updateProfileInput,{new:true})
    return `This action updates a #${id} profile`;
  }
}
