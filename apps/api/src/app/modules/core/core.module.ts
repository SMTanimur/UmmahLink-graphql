
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigurationModule, ConfigurationService, DatabaseModule } from '@social-zone/common';


@Module({
  imports: [
    DatabaseModule,
    ConfigurationModule,
    {
      ...JwtModule.registerAsync({
        useFactory: async (configurationService: ConfigurationService) => ({
          secret: configurationService.JWT_SECRET_KEY,
          signOptions: { expiresIn: '3d' },
        }),
        inject: [ConfigurationService],
      }),
      global: true,
    },
  ],
  controllers: [],
  providers: [],
})
export class CoreModule {}
