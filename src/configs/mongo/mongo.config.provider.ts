import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongoConfigProvider implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    const mongoConfig = this.configService.getOrThrow('mongo');

    return {
      uri: mongoConfig.url,
      dbName: 'notification',
      autoCreate: false,
      autoIndex: false,
    };
  }
}
