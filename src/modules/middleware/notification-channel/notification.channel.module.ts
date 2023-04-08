import { Module } from '@nestjs/common';
import { EmailNotificationChannelModule } from './email/email.notification-channel.module';
import { NotificationChannelFactory } from './notification.channel.factory';

@Module({
  imports: [EmailNotificationChannelModule],
  providers: [NotificationChannelFactory],
  exports: [NotificationChannelFactory],
})
export class NotificationChannelModule {}
