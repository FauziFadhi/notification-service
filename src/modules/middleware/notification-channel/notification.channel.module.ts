import { Module } from '@nestjs/common';
import { NotificationChannelFactory } from './notification.channel.factory';

@Module({
  imports: [],
  providers: [NotificationChannelFactory],
  exports: [NotificationChannelFactory],
})
export class NotificationChannelModule {}
