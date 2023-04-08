import { Module } from '@nestjs/common';
import { NotificationChannelModule } from 'src/modules/middleware/notification-channel/notification.channel.module';
import { NotificationFactory } from './services/notification.service';

@Module({
  imports: [NotificationChannelModule],
  providers: [NotificationFactory],
  exports: [],
})
export class AppsNotificationModule {}
