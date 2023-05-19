import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  constructor(private readonly configService: ConfigService) {}

  get API_URL() {
    return this.configService.get<string>('NX_API_URL');
  }
  get MAIL() {
    return this.configService.get<string>('MAIL');
  }


  get WEB_URL() {
    return this.configService.get<string>('WEB_URL');
  }

  get MONGODB_URI() {
    return this.configService.get<string>('MONGODB_URI');
  }

  get SESSION_SECRET_KEY() {
    return this.configService.get<string>('SESSION_SECRET_KEY');
  }

  get SESSION_NAME() {
    return this.configService.get<string>('SESSION_NAME');
  }
}
