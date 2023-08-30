/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */

import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationService } from '../configuration/configuration.service';
import { Connection } from 'mongoose';
// @ts-ignore
import mongoosePaginate from 'mongoose-paginate-v2';
// @ts-ignore
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import 'colors';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configurationService: ConfigurationService) => ({
        uri: configurationService.MONGODB_URI,
        connectionFactory: (connection: Connection) => {
          if (connection.readyState === 1) {
            Logger.log(
              ` Alhamdulillah! MongoDB Connected with: ${connection.host} `
                .bgWhite.black
            );
          }

          connection.on('disconnected', () => {
            Logger.warn('DB disconnected');
          });

          connection.on('error', (error) => {
            Logger.error(
              ` DB connection failed! for error: ${error} `.bgRed.black
                .underline.bold
            );
          });

          //! MongoDB AutoPopulate Plugin Initialization
          connection.plugin(require('mongoose-autopopulate'));
          connection.plugin(mongoosePaginate);
          connection.plugin(mongooseAggregatePaginate);
          // //@ts-ignore

          return connection;
        },
      }),
      inject: [ConfigurationService],
    }),
  ],
})
export class DatabaseModule {}
