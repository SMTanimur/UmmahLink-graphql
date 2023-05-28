/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigurationModule, DatabaseModule } from '@social-zone/common';


@Module({
  imports: [
    DatabaseModule,
    ConfigurationModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [],
  providers: [],
})
export class CoreModule {}
