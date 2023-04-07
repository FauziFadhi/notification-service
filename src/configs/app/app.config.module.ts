import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './app.config';

import schema from './app.config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      expandVariables: true,
      validationSchema: schema,
    }),
  ],
})
export class AppConfigModule {}
