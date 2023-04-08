import { Module } from '@nestjs/common';
import { NotificationChannelModule } from 'src/modules/middleware/notification-channel/notification.channel.module';
import { HappyBirthdayNotificationService } from './services/happy-birthday.notification.service';
import { LeaveBalanceNotificationService } from './services/leave-balance.notification.service';
import { MonthlyPaymentSlipNotificationService } from './services/mothly-payment-slip.notification.service';
import { NotificationFactory } from './services/notification.service';

@Module({
  imports: [NotificationChannelModule],
  providers: [
    NotificationFactory,
    HappyBirthdayNotificationService,
    MonthlyPaymentSlipNotificationService,
    LeaveBalanceNotificationService,
  ],
  exports: [],
})
export class AppsNotificationModule {}
