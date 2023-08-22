/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [UsersModule],
    controllers: [],
    providers: [EventsGateway],
})
export class EventsModule {}
