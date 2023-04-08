import { Module } from '@nestjs/common';
import { UINotificationChannel } from './services/ui.notification-channel.service';

@Module({
  providers: [UINotificationChannel],
  exports: [UINotificationChannel],
})
export class UINotificationChannelModule {}
