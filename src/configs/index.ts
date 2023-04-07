import { AppConfigModule } from './app/app.config.module';
import { MongoConfigModule } from './mongo/mongo.config.module';

export const CONFIG_MODULES = [
  // MongoConfigModule
  AppConfigModule,
];
