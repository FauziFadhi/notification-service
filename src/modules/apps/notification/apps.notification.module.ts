import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/microservices/account-service/user/user.module';
import { CompanyModule } from 'src/microservices/company-service/company.module';
import {
  UserNotification,
  UserNotificationSchema,
} from '@models/mongo/user-notification';
import { NotificationChannelModule } from 'src/modules/middleware/notification-channel/notification.channel.module';
import { AppsNotificationController } from './controllers/apps.notification.controller';
import { AppsUserNotificationController } from './controllers/apps.user-notification.controller';
import { AppsHappyBirthdayNotificationService } from './services/apps.happy-birthday.notification.service';
import { AppsLeaveBalanceNotificationService } from './services/apps.leave-balance.notification.service';
import { AppsMonthlyPaymentSlipNotificationService } from './services/apps.mothly-payment-slip.notification.service';
import { AppsNotificationFactory } from './services/apps.notification.factory';
import { AppsNotificationService } from './services/apps.notification.service';

@Module({
  imports: [
    NotificationChannelModule,
    UserModule,
    CompanyModule,
    MongooseModule.forFeature([
      { name: UserNotification.name, schema: UserNotificationSchema },
    ]),
  ],
  providers: [
    AppsNotificationFactory,
    AppsHappyBirthdayNotificationService,
    AppsMonthlyPaymentSlipNotificationService,
    AppsLeaveBalanceNotificationService,
    AppsNotificationService,
    Logger,
  ],
  controllers: [AppsNotificationController, AppsUserNotificationController],
  exports: [],
})
export class AppsNotificationModule {}
