import { Module } from '@nestjs/common';
import { EmailNotificationChannel } from './services/email.notification-channel.service';

@Module({
  providers: [EmailNotificationChannel],
  exports: [EmailNotificationChannel],
})
export class EmailNotificationChannelModule {}
