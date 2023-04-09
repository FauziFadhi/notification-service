import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserNotification,
  UserNotificationSchema,
} from 'src/models/mongo/user-notification';
import { UINotificationChannel } from './services/ui.notification-channel.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserNotification.name, schema: UserNotificationSchema },
    ]),
  ],
  providers: [UINotificationChannel],
  exports: [UINotificationChannel],
})
export class UINotificationChannelModule {}
