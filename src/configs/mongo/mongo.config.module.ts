import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from './mongo.config';
import { MongoConfigProvider } from './mongo.config.provider';

import schema from './mongo.config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      expandVariables: true,
      validationSchema: schema,
    }),
    MongooseModule.forRootAsync({
      useClass: MongoConfigProvider,
      inject: [ConfigService],
    }),
  ],
})
export class MongoConfigModule {}
