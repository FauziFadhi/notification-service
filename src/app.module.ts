import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CONFIG_MODULES } from './configs';
import { UserService } from './microservices/account-service/user/user.service';

@Module({
  imports: [...CONFIG_MODULES],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
