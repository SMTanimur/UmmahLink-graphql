
import { ConfigurationService } from '@social-zone/common';
import { ConfigOptions, v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'cloudinary',
  useFactory: (configurationService: ConfigurationService): ConfigOptions => {
    return v2.config({
      cloud_name: configurationService.CLOUDINARY_CLOUD_NAME,
      api_key: configurationService.CLOUDINARY_API_KEY,
      api_secret: configurationService.CLOUDINARY_API_SECRET,
    });
  },
  inject: [ConfigurationService],
};
