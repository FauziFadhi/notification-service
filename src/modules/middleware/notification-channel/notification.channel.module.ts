import { Module } from '@nestjs/common';
import { EmailNotificationChannelModule } from './email/email.notification-channel.module';
import { NotificationChannelFactory } from './notification.channel.factory';
import { UINotificationChannelModule } from './ui/ui.notification-channel.module';

@Module({
  imports: [EmailNotificationChannelModule, UINotificationChannelModule],
  providers: [NotificationChannelFactory],
  exports: [NotificationChannelFactory],
})
export class NotificationChannelModule {}
