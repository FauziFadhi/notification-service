import { Module } from '@nestjs/common';
import { UserModule } from 'src/microservices/account-service/user/user.module';
import { CompanyModule } from 'src/microservices/company-service/company.module';
import { NotificationChannelModule } from 'src/modules/middleware/notification-channel/notification.channel.module';
import { AppsNotificationController } from './controllers/apps.notification.controller';
import { HappyBirthdayNotificationService } from './services/happy-birthday.notification.service';
import { LeaveBalanceNotificationService } from './services/leave-balance.notification.service';
import { MonthlyPaymentSlipNotificationService } from './services/mothly-payment-slip.notification.service';
import { NotificationFactory } from './services/notification.factory';
import { NotificationService } from './services/notification.service';

@Module({
  imports: [NotificationChannelModule, UserModule, CompanyModule],
  providers: [
    NotificationFactory,
    HappyBirthdayNotificationService,
    MonthlyPaymentSlipNotificationService,
    LeaveBalanceNotificationService,
    NotificationService,
  ],
  controllers: [AppsNotificationController],
  exports: [],
})
export class AppsNotificationModule {}
