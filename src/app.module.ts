import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CONFIG_MODULES } from './configs';

@Module({
  imports: [...CONFIG_MODULES],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
